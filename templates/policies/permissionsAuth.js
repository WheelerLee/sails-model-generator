/**
 * permissionsAuth
 *
 * @module      :: Policy
 * @description :: 权限相关的验证拦截
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async function(req, res, next) {

  try {
    var path = req.path;
    var admin_id = req.session.admin.id;

    let valid = await Xt_resource.valid(admin_id, path);

    if (valid) {
      return next();
    } else {
      if (req.xhr) {
        return res.json({errCode: 4, msg: '没有访问权限!'});
      } else {
        return res.forbidden();
      }
    }

  } catch (e) {
    return res.serverError(e);
  }

};
