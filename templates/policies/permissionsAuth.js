/**
 * permissionsAuth
 *
 * @module      :: Policy
 * @description :: 权限相关的验证拦截
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  if (req.session.admin) {

    // var open_urls = ['/admin/home/index', '/admin/home', '/admin/home/index/',
    //   '/admin/home/', '/admin/home/welcome', '/admin/home/welcome/'];  //可以开放访问的页面

    var path = req.path;
    var admin_id = req.session.admin.id;

    Xt_resources.query('select xt_resources.id from xt_resources LEFT JOIN xt_role_resources on ' +
      'xt_resources.id=xt_role_resources.resources_id LEFT JOIN xt_user_role on ' +
      'xt_role_resources.role_id=xt_user_role.role_id where xt_user_role.user_id=? ' +
      'and xt_resources.path=?', [admin_id, path], function (err, results) {

      if (err) return res.serverError(err);
      else {
        if (results.length > 0) {
          return next();
        } else {
          if (req.xhr) {
            return res.json({errCode: 4, msg: '没有访问权限!'});
          } else {
            return res.forbidden(err);
          }
        }
      }

    });


    // if (open_urls.indexOf(path) >= 0) {  //开放访问的页面直接访问就可以了

    //   return next();
    //
    // } else {
    //
    //   path = path.substr(0, path.length - (path.endsWith('/') ? 1 : 0));
    //   var admin_id = req.session.admin.id;
    //
    //
    //
    // }
  }
};