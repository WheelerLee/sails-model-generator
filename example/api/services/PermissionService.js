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
    return Xt_resource.valid(admin_id, permission);
  }

};
