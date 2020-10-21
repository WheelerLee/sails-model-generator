import { getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import Dict from '../../entities/sys/Dict';

/**
 * 字典首页
 */
export async function index(req: Sails.Request, res: Sails.Response) {
  const x = req.param('x');
  // 因为前段组件的bug，暂时传递一个x参数等于y来判断加载数据
  if (x === 'y') {
    const dicts = await getRepository(Dict).find({
      order: {
        createdAt: 'ASC'
      },
      where: {
        deleted: 0
      }
    });
    return res.json(dicts);
  }
  res.view();
}

export async function modify(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  const parent = req.param('parent');
  if (req.method.toLowerCase() === 'get') {
    let dict: Dict | undefined;
    if (id) {
      dict = await getRepository(Dict).findOne(id);
    }
    return res.view({
      dict: dict,
      parent: parent
    });
  }
  const { body } = req;
  const dict = Dict.parse(body);
  await getRepository(Dict).save(dict);
  return res.json({
    code: 0,
    msg: '添加成功'
  });
}
