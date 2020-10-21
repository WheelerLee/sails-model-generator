/**
 * 首页的控制权
 * Created at 2020-10-15 20:03
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */

import { getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import User from '../../entities/sys/User';

/**
 * 首页
 */
export async function index(req: Sails.Request, res: Sails.Response) {
  const { id } = req.session.admin;
  const user = await getRepository(User).findOne(id);
  res.view({
    layout: 'layout',
    user: user
  });
}
