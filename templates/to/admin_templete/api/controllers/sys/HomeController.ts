/**
 * 首页的控制器
 * Created at 2020-10-15 20:03
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */

import { getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import PageResource from '../../dto/sys/PageResource';
import Resource from '../../entities/sys/Resource';
import User from '../../entities/sys/User';
import PermissionService from '../../services/PermissionService';

/**
 * 首页
 */
export async function index(req: Sails.Request, res: Sails.Response) {
  const { id } = req.session.admin;
  const user = await getRepository(User).findOne(id);
  const resources: Array<Resource> = await PermissionService.getAllResources(id, 'SYS_RESOURCE_TYPE_PAGE');
  const homeResources: Array<PageResource> = PermissionService.process(resources);
  res.view({
    user: user,
    resources: homeResources
  });
}

export async function splash(req: Sails.Request, res: Sails.Response) {
  res.send('首页');
}
