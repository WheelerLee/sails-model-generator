/**
 * adminPermission
 *
 * @module      :: Policy
 * @description :: 权限相关的验证拦截
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
import Sails from '../../@types/sails';
import PermissionService from '../services/PermissionService';

export = async function (req: Sails.Request, res: Sails.Response, next: Sails.Proceed) {
  const path = req.path;
  const id = req.session.admin.id;
  const valid = await PermissionService.valid(id, path);
  if (valid) {
    return next();
  }
  if (req.xhr) {
    return res.json({
      code: 4,
      msg: '没有访问权限'
    });
  }
  return res.forbidden();
};
