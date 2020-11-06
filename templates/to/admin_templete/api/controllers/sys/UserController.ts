/**
 * 管理员控制权
 * Created at 2020-10-15 20:05
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */

import { FindConditions, getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import Role from '../../entities/sys/Role';
import User from '../../entities/sys/User';
import PermissionService from '../../services/PermissionService';

/**
 * 登录
 */
export async function login(req: Sails.Request, res: Sails.Response) {
  if (req.method.toLowerCase() === 'get') {
    return res.view();
  }
  const username: string = req.param('username');
  const password: string = req.param('password');
  const user = await getRepository(User).findOne({ loginName: username, password: password });
  if (user) {
    req.session.admin = user;
    return res.json({
      code: 0,
      msg: '登录成功'
    });
  }
  return res.json({
    code: 1,
    msg: '用户名或密码错误'
  });
}

export async function index(req: Sails.Request, res: Sails.Response) {
  if (req.method.toLowerCase() === 'get') {
    const modifyPermission = await PermissionService.valid(req.session.admin.id, '/sys/user/modify');
    const removePermission = await PermissionService.valid(req.session.admin.id, '/sys/user/remove');
    return res.view({
      modifyPermission: modifyPermission,
      removePermission: removePermission,
    });
  }
  const page = parseInt(req.param('page', '1'));
  const limit = parseInt(req.param('limit', '10'));
  // TODO: 默认不生成所有字段的查询条件，需要请自行添加
  // const name = req.param('name', '').trim();
  const params: FindConditions<User> = {
    deleted: 0,
  };
  // if (name) {
  //   params.name = Like(`%${name}%`);
  // }
  const [users, count] = await getRepository(User).findAndCount({
    where: params,
    skip: (page - 1) * limit,
    take: limit,
  });
  res.json({
    code: 0,
    count: count,
    data: users
  });
}

export async function modify(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  if (req.method.toLowerCase() === 'get') {
    let user: User | undefined;
    if (id) {
      user = await getRepository(User).findOne(id, {
        relations: ['userRoles', 'userRoles.role']
      });
    }
    const roles = await getRepository(Role).find({
      where: {
        deleted: 0
      }
    });
    let currentRole: Role | undefined;
    if (user?.userRoles) {
      currentRole = user?.userRoles[0].role as Role;
    }
    return res.view({
      user: user,
      roles: roles,
      currentRole: currentRole
    });
  }
  const user: User = User.parse(req.body);
  if (!user.password) {
    delete user.password;
  }
  const roleId: string = req.param('roleId');
  await PermissionService.distributeRole(roleId, user);
  return res.json({
    code: 0,
    msg: '保存成功'
  });
}

export async function remove(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  // TODO: 一般情况下删除之前需要检查关联的外键是否存在数据
  await getRepository(User).update(id, { deleted: 1 });
  return res.json({
    code: 0,
    msg: '删除成功'
  });
}
