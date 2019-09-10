/**
 * Created by WheelerLee.
 * admin/Xt_roleController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_role/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_role/delete');
      var distribution_resource_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_role/distribution_resource');
      return res.view({
        layout: 'admin/layout',
        modify_permission: modify_permission,
        delete_permission: delete_permission,
        distribution_resource_permission: distribution_resource_permission
      });
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('id') && req.param('id').trim() !== '') {
          obj['id'] = req.param('id').trim();
        }
        if (req.param('deleted') && req.param('deleted').trim() !== '') {
          obj['deleted'] = req.param('deleted').trim();
        }
        if (req.param('create_user') && req.param('create_user').trim() !== '') {
          obj['create_user'] = {contains: req.param('create_user').trim()};
        }
        if (req.param('sorted_num') && req.param('sorted_num').trim() !== '') {
          obj['sorted_num'] = req.param('sorted_num').trim();
        }

        let data = await Xt_role.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Xt_role.count(obj);
        res.json({
          code: 0,
          msg: '',
          count: count,
          data: data
        });
      } catch (e) {
        res.json({
          code: 1,
          msg: '获取失败'
        });
      }
    }
  },

  modify: async function (req, res) {

    if (req.method.toLowerCase() === 'get') {
      var id = req.param('id');
      let xt_role = {};
      if (id) {
        xt_role = await Xt_role.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', xt_role: xt_role});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Xt_role.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Xt_role.create(obj);
        }

        res.json({
          errCode: 0,
          msg: id ? '修改成功' : '添加成功',
          data: result
        });
      } catch (e) {
        res.json({
          errCode: 1,
          msg: '服务异常，请重试'
        });
      }
    }

  },

  delete: async function (req, res) {
    try {
      var id = req.param('id');
      var result = await Xt_role.update({id: id}, {deleted: 1});
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
  },

  /**
   * 分配资源
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  distribution_resource: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      try {
        var role_id = req.param('role_id');
        var result = await(Xt_role_resource.find({role_id: role_id}));
        var resources = await(Xt_resource.find({where: {parent_id: null}, sort: "sorted_num"}).populate('sub_resources'));
        for (var i in resources) {
          for (var j in resources[i].sub_resources) {
            var resource = resources[i].sub_resources[j];
            for (var k in result) {
              if (result[k].resource_id === resource.id) {
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

        await(Xt_role_resource.destroy({role_id: role_id}));  //先删除当前角色下的所有分配的资源

        for (var i in resources) {
          var resource = resources[i];
          var resource_ids = req.param(resource, []);

          if (resource_ids.length > 0) { //大于0的话把父资源也添加到关联表
            await(Xt_role_resource.create({
              role_id: role_id,
              resource_id: resource
            }));
          }

          for (var j in resource_ids) {
            var resource_id = resource_ids[j];

            var role_resource = await(Xt_role_resource.findOne({role_id: role_id, resource_id: resource_id}));
            if (!role_resource) {
              await(Xt_role_resource.create({
                role_id: role_id,
                resource_id: resource_id
              }));
            }

          }
        }
        return res.json({
          errCode: 0,
          msg: '保存成功!'
        });

      } catch (e) {
        console.log(e);
        return res.json({
          errCode: 1,
          msg: '系统异常，请关闭页面重试!'
        });
      }

    }
  }

};
