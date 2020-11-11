/**
 * FIXME: msg/Message 该代码由生成器生成，请修改该注释
 * Created at 2020年10月29日14:03:38
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
import { FindConditions, getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import Message from '../../entities/msg/Message';
import PermissionService from '../../services/PermissionService';

export async function index(req: Sails.Request, res: Sails.Response) {
  if (req.method.toLowerCase() === 'get') {
    const modifyPermission = await PermissionService.valid(req.session.admin.id, '/msg/message/modify');
    const removePermission = await PermissionService.valid(req.session.admin.id, '/msg/message/remove');
    return res.view({
      modifyPermission: modifyPermission,
      removePermission: removePermission,
    });
  }
  const page = parseInt(req.param('page', '1'));
  const limit = parseInt(req.param('limit', '10'));
  // TODO: 默认不生成所有字段的查询条件，需要请自行添加
  // const name = req.param('name', '').trim();
  const params: FindConditions<Message> = {
    deleted: 0,
  };
  // if (name) {
  //   params.name = Like(`%${name}%`);
  // }
  const [messages, count] = await getRepository(Message).findAndCount({
    where: params,
    skip: (page - 1) * limit,
    take: limit,
  });
  res.json({
    code: 0,
    count: count,
    data: messages
  });
}

export async function modify(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  if (req.method.toLowerCase() === 'get') {
    let message: Message | undefined;
    if (id) {
      message = await getRepository(Message).findOne(id);
    }
    return res.view({
      message: message
    });
  }
  const message: Message = Message.parse(req.body);
  await getRepository(Message).save(message);
  return res.json({
    code: 0,
    msg: '保存成功'
  });
}

export async function remove(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  // TODO: 一般情况下删除之前需要检查关联的外键是否存在数据
  await getRepository(Message).update(id, { deleted: 1 });
  return res.json({
    code: 0,
    msg: '删除成功'
  });
}
