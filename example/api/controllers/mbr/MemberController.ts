/**
 * FIXME: mbr/Member 该代码由生成器生成，请修改该注释
 * Created at 2020年10月29日14:03:38
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
import { FindConditions, getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import Member from '../../entities/mbr/Member';
import PermissionService from '../../services/PermissionService';

export async function index(req: Sails.Request, res: Sails.Response) {
  if (req.method.toLowerCase() === 'get') {
    const modifyPermission = await PermissionService.valid(req.session.admin.id, '/sys/member/modify');
    const removePermission = await PermissionService.valid(req.session.admin.id, '/sys//member/remove');
    return res.view({
      modifyPermission: modifyPermission,
      removePermission: removePermission,
    });
  }
  const page = parseInt(req.param('page', '1'));
  const limit = parseInt(req.param('limit', '10'));
  // TODO: 默认不生成所有字段的查询条件，需要请自行添加
  // const name = req.param('name', '').trim();
  const params: FindConditions<Member> = {
    deleted: 0,
  };
  // if (name) {
  //   params.name = Like(`%${name}%`);
  // }
  const [members, count] = await getRepository(Member).findAndCount({
    where: params,
    skip: (page - 1) * limit,
    take: limit,
  });
  res.json({
    code: 0,
    count: count,
    data: members
  });
}

export async function modify(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  if (req.method.toLowerCase() === 'get') {
    let member: Member | undefined;
    if (id) {
      member = await getRepository(Member).findOne(id);
    }
    return res.view({
      member: member
    });
  }
  const member: Member = Member.parse(req.body);
  await getRepository(Member).save(member);
  return res.json({
    code: 0,
    msg: '保存成功'
  });
}

export async function remove(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  // TODO: 一般情况下删除之前需要检查关联的外键是否存在数据
  await getRepository(Member).update(id, { deleted: 1 });
  return res.json({
    code: 0,
    msg: '删除成功'
  });
}
