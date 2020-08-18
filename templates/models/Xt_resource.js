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
  getPageByUserId: async function (userId) {

    const xx = async function(parent_id) {
      let sql;
      if (parent_id) {
        sql = 'select xt_resource.* from xt_resource LEFT JOIN xt_role_resource on ' +
          'xt_resource.id=xt_role_resource.resource_id LEFT JOIN xt_user_role on ' +
          'xt_role_resource.role_id=xt_user_role.role_id where xt_user_role.user_id=$1 ' +
          'and xt_resource.deleted=0 and xt_role_resource.deleted=0 and xt_user_role.deleted=0 ' +
          'and xt_resource.res_type_code=$2 and xt_resource.parent_id=$3 order by ' + 
          'xt_resource.parent_id,xt_resource.sorted_num asc';
      } else {
        sql = 'select xt_resource.* from xt_resource LEFT JOIN xt_role_resource on ' +
          'xt_resource.id=xt_role_resource.resource_id LEFT JOIN xt_user_role on ' +
          'xt_role_resource.role_id=xt_user_role.role_id where xt_user_role.user_id=$1 ' +
          'and xt_resource.deleted=0 and xt_role_resource.deleted=0 and xt_user_role.deleted=0 ' +
          'and xt_resource.res_type_code=$2 and xt_resource.parent_id is null order by ' + 
          'xt_resource.parent_id,xt_resource.sorted_num asc';
      }
      let resources = (await sails.sendNativeQuery(sql, [userId, 'resource_page', parent_id])).rows;

      for (let r of resources) {
        r.sub_resources = await xx(r.id);
      }

      return resources;
    };

    return (await xx());

  },

  /**
   * 获取所有的权限，按照children排列
   */
  getAllResources: async function(parent_id) {

    let resources = [];
    if (parent_id) {
      let sql = 'select *, name as title from xt_resource where deleted = 0 and parent_id=$1 order by xt_resource.sorted_num asc';
      resources = (await sails.sendNativeQuery(sql, [parent_id])).rows;
    } else {
      let sql = 'select *, name as title from xt_resource where deleted = 0 and parent_id is null order by sorted_num asc';
      resources = (await sails.sendNativeQuery(sql)).rows;
    }
    for (let resource of resources) {
      resource.children = await Xt_resource.getAllResources(resource.id);
    }
    
    return resources;
    
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

  afterUpdate: async function (updatedRecord, proceed) {
    if (updatedRecord.deleted === 1) { //删除的话，顺道删除子元素
      await Xt_resource.update({
        parent_id: updatedRecord.id
      }, {
        deleted: 1
      });
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
