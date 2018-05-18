/**
 * adminSessionAuth
 *
 * @module      :: Policy
 * @description :: 权限相关的验证拦截
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    return res.redirect('/admin/user/login');
  }
};
