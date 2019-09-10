/**
 * Created by WheelerLee on 2018-05-09 16:38.
 * Xt_resource
 * Copyright 2017 https://github.com/WheelerLee
 */

module.exports = {

  attributes: {
    name: {  //资源名称
      type: 'string',
      maxLength: 100,
      columnType: 'varchar(100)',
      required: true
    },
    res_type_code: {    //资源类型(DICT)   page_type:页面，  btn_type:按钮类型
      model: 'Xt_dict',
      required: true
    },
    icon_path: {    //图标
      type: 'string',
      maxLength: 50,
      columnType: 'varchar(50)',
      allowNull: true
    },
    path: {    //资源路径
      type: 'string',
      maxLength: 500,
      columnType: 'varchar(500)',
      allowNull: true
    },
    description: {    //资源描述
      type: 'string',
      maxLength: 500,
      columnType: 'varchar(500)',
      allowNull: true
    },
    parent_id: {    //父资源ID
      model: 'Xt_resource'
    },
    sub_resources: {
      collection: 'Xt_resource',
      via: 'parent_id'
    }
  },

  /**
   * 获取userId的页面资源
   * @param userId 用户ID
   */
  getPageByUserId: function (userId) {

    let sql = 'select xt_resource.* from xt_resource LEFT JOIN xt_role_resource on ' +
      'xt_resource.id=xt_role_resource.resource_id LEFT JOIN xt_user_role on ' +
      'xt_role_resource.role_id=xt_user_role.role_id where xt_user_role.user_id=$1 ' +
      'and xt_resource.deleted=0 and xt_role_resource.deleted=0 and xt_user_role.deleted=0 ' +
      'and xt_resource.res_type_code=$2 order by xt_resource.parent_id,xt_resource.sorted_num asc';

    return sails.sendNativeQuery(sql, [userId, 'resource_page']).then(function (results) {

      var getParent = function (rs, id) {
        for (var i in rs) {
          var resource = rs[i];
          if (resource.id === id) {
            return resource;
          }
        }
        return null
      };

      results = results.rows;
      var resources = [];
      for (var i in results) {
        var resource = results[i];
        if (!resource.parent_id) {
          resources.push(resource);
        } else {
          var parent = getParent(resources, resource.parent_id);
          if (!parent) continue;
          if (!parent.sub_resources) parent.sub_resources = [];
          parent.sub_resources.push(resource);
        }
      }
      return resources;
    });
  },

  beforeCreate: function (valuesToSet, proceed) {
    if (valuesToSet.path) {
      valuesToSet.path = valuesToSet.path.toLowerCase();
    }
    return proceed();
  },

  beforeUpdate: function (valuesToSet, proceed) {
    if (valuesToSet.path) {
      valuesToSet.path = valuesToSet.path.toLowerCase();
    }
    return proceed();
  },

  /**
   * 验证用户是否有某个权限
   * @param adminId 用户id
   * @param permission 需要验证的权限
   * @returns {Promise}
   */
  valid: function (adminId, permission) {
    var rr = new Promise(function (resolve, reject) {

      sails.sendNativeQuery('select xt_resource.* from xt_resource LEFT JOIN xt_role_resource on ' +
        'xt_resource.id=xt_role_resource.resource_id LEFT JOIN xt_user_role on ' +
        'xt_role_resource.role_id=xt_user_role.role_id where xt_user_role.user_id=$1 ' +
        'and xt_resource.deleted=0 and xt_role_resource.deleted=0 and xt_user_role.deleted=0 ' +
        'and xt_resource.path=$2', [adminId, permission.toLowerCase()], function (err, results) {

        if (err) reject(err);
        else {
          if (results.rows.length === 0) {
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
