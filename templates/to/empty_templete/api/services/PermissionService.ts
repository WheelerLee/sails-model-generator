/**
 * 权限服务类
 * Created at 2020-10-28 16:14
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */
import _ from 'lodash';
import {
  EntityManager, getRepository, Transaction, TransactionManager
} from 'typeorm';
import PageResource from '../dto/sys/PageResource';
import Resource from '../entities/sys/Resource';
import RoleResource from '../entities/sys/RoleResource';
import UserRole from '../entities/sys/UserRole';

export default class PermissionService {
  /**
   * 根据角色id查找拥有的所有权限
   * @param userId 用户id
   */
  static async getAllResources(userId: string, resourceType?: string): Promise<Array<Resource>> {
    const sql = `SELECT sys_resource.* FROM sys_resource LEFT JOIN 
      sys_role_resource ON sys_role_resource.resourceId=sys_resource.id 
      LEFT JOIN sys_role ON sys_role.id = sys_role_resource.roleId LEFT 
      JOIN sys_user_role ON sys_user_role.roleId=sys_role.id WHERE 
      sys_user_role.userId=? AND sys_resource.deleted=0 
      AND sys_role.deleted=0 ${resourceType ? 'AND resourceType=?' : ''} AND sys_user_role.deleted=0 AND 
      sys_role_resource.deleted=0 ORDER BY sys_resource.parentId ASC, 
      sys_resource.sortedNum ASC`;
    const resources: Array<Resource> = await getRepository(Resource)
      .query(sql, [userId, resourceType]);
    return resources;
  }

  /**
   * 给用户分配权限
   * @param userId 用户id
   * @param resources 权限
   */
  @Transaction()
  static async distribute(userId: string, resources: Array<PageResource>,
    @TransactionManager() manager?: EntityManager): Promise<boolean> {
    const userRole = await manager?.getRepository(UserRole).findOne({
      where: {
        user: userId
      },
      relations: ['role']
    });
    if (userRole) {
      // 先删除所有的权限
      await manager?.getRepository(RoleResource).delete({
        role: userRole.role
      });
      const save = async function (rs: Array<PageResource>) {
        for (const resource of rs) {
          const roleResource = new RoleResource();
          roleResource.role = userRole.role;
          roleResource.resource = resource.id;
          await manager?.getRepository(RoleResource).save(roleResource);
          if (resource.children) {
            await save(resource.children);
          }
        }
      };
      await save(resources);
    }
    return true;
  }

  /**
   * 获取上级资源
   * @param pageResources
   * @param parentId
   */
  static getParent(pageResources: Array<PageResource>, parentId: string): PageResource | undefined {
    for (const res of pageResources) {
      if (res.id === parentId) {
        return res;
      }
    }
    return undefined;
  }

  /**
   * 将所有的资源按照父子关系排列
   * @param resources 资源列表
   */
  static process(resources: Array<Resource>,
    pageResources: Array<PageResource> = [], tmp: Array<Resource> = []): Array<PageResource> {
    const tmp2: Array<Resource> = [];
    for (const resource of resources) {
      if (resource.parentId) {
        const parent = this.getParent(tmp, resource.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(resource);
          tmp2.push(resource);
        }
      } else {
        pageResources.push(resource);
        tmp2.push(resource);
      }
    }
    const x = _.difference(resources, tmp2); // 删除已经用掉的
    if (x.length > 0) {
      this.process(x, pageResources, tmp2);
    }
    return pageResources;
  }

  /**
   * 验证用户是否拥有资源
   * @param userId 用户
   * @param resource 资源
   */
  static async valid(userId: string, resource: string): Promise<boolean> {
    const sql = `select sys_resource.* from sys_resource LEFT JOIN sys_role_resource 
      on sys_resource.id=sys_role_resource.resourceId LEFT JOIN sys_user_role on 
      sys_role_resource.roleId=sys_user_role.roleId where sys_user_role.userId=? 
      and sys_resource.deleted=0 and sys_role_resource.deleted=0 and sys_user_role.deleted=0 
      and sys_resource.path=?`;
    const ps = await getRepository(Resource).query(sql, [userId, resource]);
    if (ps && ps.length > 0) {
      return true;
    }
    return false;
  }
}
