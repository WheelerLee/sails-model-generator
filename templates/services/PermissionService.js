/**
 * Created by liwei on 2017/9/1.
 */

module.exports = {

  /**
   * 验证当前管理员是否有某个权限
   * @param admin_id 待验证的管理员
   * @param permission 待验证的权限
   * @returns {Promise}
   */
  valid: function (admin_id, permission) {

    var rr = new Promise(function (resolve, reject) {

      Xt_resources.query('select xt_resources.* from xt_resources LEFT JOIN xt_role_resources on ' +
        'xt_resources.id=xt_role_resources.resources_id LEFT JOIN xt_user_role on ' +
        'xt_role_resources.role_id=xt_user_role.role_id where xt_user_role.user_id=? ' +
        'and xt_resources.path=?', [admin_id, permission], function (err, results) {

        if (err) reject(err);
        else {

          if (results.length === 0) {
            resolve(false);
          } else {
            resolve(true);
          }

        }

      });

    });

    return rr;

  }

};