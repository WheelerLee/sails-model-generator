import { getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import Dict from '../../entities/sys/Dict';
import Resource from '../../entities/sys/Resource';

export async function index(req: Sails.Request, res: Sails.Response) {
  if (req.param('x') === 'y') {
    const resources = await getRepository(Resource).find({
      where: {
        deleted: 0
      },
      order: {
        createdAt: 'ASC'
      }
    });
    return res.json(resources);
  }
  return res.view();
}

export async function modify(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  let parentId = parseInt(req.param('parentId', '0'));

  if (req.method.toLowerCase() === 'get') {
    let resource: Resource | undefined;
    const resourceTypes = await getRepository(Dict).find({
      where: {
        deleted: 0,
        parent: 'SYS_RESOURCE'
      }
    });
    let parent: Resource | undefined;
    // 有id说明是修改
    if (id) {
      resource = await getRepository(Resource).findOne(id);
      if (resource && resource.parentId) {
        parentId = resource.parentId;
      }
    }
    if (parentId) {
      parent = await getRepository(Resource).findOne({
        where: {
          id: parentId
        }
      });
      sails.log.debug(parent);
    }
    return res.view({ resource: resource, resourceTypes: resourceTypes, parent: parent });
  }

  const resource: Resource = Resource.parse(req.body);
  resource.parentId = parentId;
  await getRepository(Resource).save(resource);
  return res.json({
    code: 0,
    msg: '添加成功'
  });
}
