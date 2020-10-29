/**
 * 管理员控制权
 * Created at 2020-10-15 20:05
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */

import { getRepository } from 'typeorm';
import Sails from '../../../@types/sails';
import User from '../../entities/sys/User';

/**
 * 登录
 */
export async function login(req: Sails.Request, res: Sails.Response) {
  if (req.method.toLowerCase() === 'get') {
    return res.view({ layout: 'layout' });
  }
  const username: string = req.param('username');
  const password: string = req.param('password');
  const user = await getRepository(User).findOne({ loginName: username, password: password });
  if (user) {
    req.session.admin = user;
    return res.json({
      code: 0,
      msg: '登录成功'
    });
  }
  return res.json({
    code: 1,
    msg: '用户名或密码错误'
  });
}
