import { FindConditions, getRepository, Like } from 'typeorm';
import Sails from '../../../@types/sails';
import PageResource from '../../dto/sys/PageResource';
import Resource from '../../entities/sys/Resource';
import Role from '../../entities/sys/Role';
import PermissionService from '../../services/PermissionService';

export async function index(req: Sails.Request, res: Sails.Response) {
  if (req.method.toLowerCase() === 'get') {
    // FIXME: 这里要修改
    return res.view({
      modify_permission: true,
      distribution_resource_permission: true,
      delete_permission: true,
    });
  }
  const page = parseInt(req.param('page', '1'));
  const limit = parseInt(req.param('limit', '10'));
  const name = req.param('name', '').trim();
  const params: FindConditions<Role> = {
    deleted: 0,
  };
  if (name) {
    params.name = Like(`%${name}%`);
  }
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

export async function distribute(req: Sails.Request, res: Sails.Response) {
  const roleId = req.param('roleId');
  if (req.method.toLowerCase() === 'get') {
    const resources: Array<Resource> = await getRepository(Resource).find({
      where: {
        deleted: 0,
        resourceType: 'SYS_RESOURCE_TYPE_PAGE'
      },
      order: {
        parentId: 'ASC',
        sortedNum: 'ASC'
      }
    });
    const homeResources: Array<PageResource> = PermissionService.process(resources);
    const changeNameToTitle = function (rs: Array<PageResource>) {
      for (const resource of rs) {
        resource.title = resource.name;
        if (resource.children && resource.children.length > 0) {
          changeNameToTitle(resource.children);
        }
      }
    };
    changeNameToTitle(homeResources);

    const checkedResources = await PermissionService.getAllResources(req.session.admin.id);
    const check = function (rs: Array<PageResource>) {
      for (const resource of rs) {
        for (const r of checkedResources) {
          if (resource.id === r.id && (!resource.children || resource.children.length === 0)) {
            resource.checked = true;
            break;
          }
        }
        if (resource.children && resource.children.length > 0) {
          check(resource.children);
        }
      }
    };
    check(homeResources);

    return res.view({
      roleId: roleId,
      resources: homeResources
    });
  }
  const resources = req.param('resources') as unknown as Array<Resource>;
  await PermissionService.distribute(req.session.admin.id, resources);
  return res.json({
    code: 0,
    msg: '保存成功'
  });
}
