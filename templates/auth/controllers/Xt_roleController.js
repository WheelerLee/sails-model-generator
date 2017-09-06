/**
 * Admin/Xt_roleController
 *
 * @description :: Server-side logic for managing admin/roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var moment = require('moment');

module.exports = {

  /**
   * 列表页面
   * @param req
   * @param res
   */
  index: async(function (req, res) {
    if (req.xhr) {  //ajax请求为数据接口

      var page = parseInt(req.param('page', 1));
      var limit = parseInt(req.param('limit', 30));
      var name = req.param('name', '');

      var obj = {};
      if (name) obj.name = {contains: name};

      var roles = await(Xt_role.find({where: obj, limit: limit, skip: (page - 1) * limit}));
      var count = await(Xt_role.count(obj));

      var obj = {
        code: 0,
        msg: '',
        count: count,
        data: roles
      };

      var str = JSON.stringify(obj, function (key, value) {
        if (key === 'updatedAt') {
          return moment(value).utc().utcOffset(480).format('YYYY-M-D HH:mm:ss');
        }
        return value;
      });

      res.send(str);

    } else {

      try {

        var add_permission = await(PermissionService.valid(req.session.admin.id, '/admin/xt_role/add'));
        var delete_permission = await(PermissionService.valid(req.session.admin.id, '/admin/xt_role/delete'));
        var distribution_permission = await(PermissionService.valid(req.session.admin.id, '/admin/xt_role/distribution_resource'));
        res.view({layout: 'admin/layout', add_permission: add_permission, delete_permission: delete_permission,
          distribution_permission: distribution_permission});

      } catch (e) {

        res.serverError(e);

      }
    }

  }),

  /**
   * 新增角色
   * @param req
   * @param res
   */
  add: async(function (req, res) {
    if (req.method.toLowerCase() === 'get') {

      var id = req.param('id');
      var role = {};
      if (id) {
        role = await(Xt_role.findOne({id: id}));
      }

      return res.view({layout: 'admin/layout', role: role});
    }
    try {
      var id = req.param('id');
      var name = req.param('name', '');
      var sorted_num = req.param('sorted_num', 1);

      if (id) {
        var result = await(Xt_role.update({id: id}, {name: name, sorted_num: sorted_num}));
        res.json({
          errCode: 0,
          msg: '修改成功',
          data: result
        });
      } else {
        var result = await(Xt_role.create({name: name, sorted_num: sorted_num, create_user: req.session.admin.id}));
        res.json({
          errCode: 0,
          msg: '新增成功',
          data: result
        });
      }
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '操作失败,请重试!'
      });
    }
  }),

  /**
   * 修改角色信息
   * @param req
   * @param res
   */
  update: async(function (req, res) {
    try {
      var id = req.param('id', '');
      var name = req.param('name', '');
      var sorter_num = req.param('sorter_num', 1);
      var result = await(Xt_role.update({id: id}, {name: name, sorter_num: sorter_num}));
      res.json({
        errCode: 0,
        msg: '修改成功',
        data: result
      });
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '修改失败，请重试!'
      });
    }
  }),

  /**
   * 删除角色信息
   * @param req
   * @param res
   */
  delete: async(function (req, res) {
    try {
      var id = req.param('id', '');
      var result = await(Xt_role.destroy({id: id}));
      res.json({
        errCode: 0,
        msg: '删除成功',
        data: result
      });
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '删除失败，请重试!'
      });
    }
  }),

  /**
   * 角色资源分配查询
   * @param req
   * @param res
   */
  distribution_resource: async(function (req, res) {
    if (req.method.toLowerCase() === 'get') {

      try {
        var role_id = req.param('role_id');

        var result = await(Xt_role_resources.find({role_id: role_id}));
        var resources = await(Xt_resources.find({parent_id: '-1'}).populate('sub_resources'));
        for (var i in resources) {
          for (var j in resources[i].sub_resources) {
            var resource = resources[i].sub_resources[j];
            for (var k in result) {
              if (result[k].resources_id === resource.id) {
                resource.isUse = true;
              }
            }
          }
        }

        return res.view({layout: 'admin/layout', resources: resources, role_id: role_id});

      } catch (e) {
        res.serverError(e);
      }
    } else {

      try {
        var resources = req.param('resources', []);
        var role_id = req.param('role_id', '');
        if (!role_id) {
          return res.json({
            errCode: 1,
            msg: '系统异常，请关闭页面重试!'
          });
        }

        await(Xt_role_resources.destroy({role_id: role_id}));  //先删除当前角色下的所有分配的资源

        for (var i in resources) {
          var resource = resources[i];
          var resource_ids = req.param(resource, []);

          if (resource_ids.length > 0) { //大于0的话把父资源也添加到关联表
            await(Xt_role_resources.create({role_id: role_id, resources_id: resource, create_user: req.session.admin.id}));
          }

          for (var j in resource_ids) {
            var resource_id = resource_ids[j];

            var role_resource = await(Xt_role_resources.findOne({role_id: role_id, resources_id: resource_id}));
            if (!role_resource) {
              await(Xt_role_resources.create({role_id: role_id, resources_id: resource_id, create_user: req.session.admin.id}));
            }

          }
        }
        return res.json({
          errCode: 0,
          msg: '保存成功!'
        });

      } catch (e) {
        return res.json({
          errCode: 1,
          msg: '系统异常，请关闭页面重试!'
        });
      }

    }
  }),

  /**
   * 角色资源分配
   * @param req
   * @param res
   */
  role_resource_distribution: async(function (req, res) {
    try {
      var rescourceArr = req.param('rescourceArr','');
      var role_id = req.param('role_id', '');
      var resources = await(Xt_resources.find({or: [{parent_id: null}, {parent_id: ''}]}).populate('sub_resources'));

      for (var i in resources) {
        for (var j in resources[i].sub_resources) {
          for (var k in rescourceArr) {
            if (rescourceArr[k].id === resources[i].sub_resources.id) {
              resources.isUse = true;
            } else {
              resources.isUse = false;
            }
          }
        }
      }
    } catch (e) {

    }

  })

};


