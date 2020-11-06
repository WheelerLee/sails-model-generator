/**
 * adminSession
 *
 * @module      :: Policy
 * @description :: 权限相关的验证拦截
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
import Sails from '../../@types/sails';

export = function (req: Sails.Request, res: Sails.Response, next: Sails.Proceed) {
  if (req.session.admin) {
    return next();
  }
  if (req.xhr) {
    return res.json({
      code: 3,
      msg: '请先登录'
    });
  }
  return res.redirect('/sys/user/login');
};
