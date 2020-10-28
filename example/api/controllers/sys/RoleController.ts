import { FindConditions, getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import Role from '../../entities/sys/Role';

export async function index(req: Sails.Request, res: Sails.Response) {
  if (req.method.toLowerCase() === 'get') {
    return res.view({
      modify_permission: true,
      distribution_resource_permission: true,
      delete_permission: true,
    });
  }
  const page = parseInt(req.param('page', '1'));
  const limit = parseInt(req.param('limit', '10'));
  const params: FindConditions<Role> = {
    deleted: 0,
  };
  const [roles, count] = await getRepository(Role).findAndCount({
    where: params,
    skip: (page - 1) * limit,
    take: limit,
  });
  res.json({
    code: 0,
    count: count,
    data: roles
  });
}

export async function modify(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  if (req.method.toLowerCase() === 'get') {
    let role: Role | undefined;
    if (id) {
      role = await getRepository(Role).findOne(id);
    }
    return res.view({
      role: role
    });
  }
  const role: Role = Role.parse(req.body);
  await getRepository(Role).save(role);
  return res.json({
    code: 0,
    msg: '保存成功'
  });
}

export async function remove(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  // TODO: 一般情况下删除之前需要检查关联的外键是否存在数据
  await getRepository(Role).update(id, { deleted: 1 });
  return res.json({
    code: 0,
    msg: '删除成功'
  });
}
