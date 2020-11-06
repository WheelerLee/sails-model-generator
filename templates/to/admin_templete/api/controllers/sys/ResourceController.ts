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
  let parentId = req.param('parentId');

  if (req.method.toLowerCase() === 'get') {
    let resource: Resource | undefined;
    const resourceTypes = await getRepository(Dict).find({
      where: {
        deleted: 0,
        parent: 'SYS_RESOURCE_TYPE'
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
    }
    return res.view({ resource: resource, resourceTypes: resourceTypes, parent: parent });
  }

  const resource: Resource = Resource.parse(req.body);
  if (parentId) {
    resource.parentId = parentId;
  }
  await getRepository(Resource).save(resource);
  return res.json({
    code: 0,
    msg: '保存成功'
  });
}

export async function remove(req: Sails.Request, res: Sails.Response) {
  const id = req.param('id');
  const subCount = await getRepository(Resource).count({
    where: {
      deleted: 0,
      parentId: id
    }
  });
  if (subCount) {
    return res.json({
      code: 1,
      msg: '该资源还存在下级资源，请先删除下级资源后再试'
    });
  }
  await getRepository(Resource).update(id, { deleted: 1 });
  return res.json({
    code: 0,
    msg: '删除成功'
  });
}
