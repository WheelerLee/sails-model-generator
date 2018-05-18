/**
 * Created by WheelerLee.
 * admin/Xt_resourceController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_resource/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_resource/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('res_type_code') && req.param('res_type_code').trim() !== '') {
          obj['res_type_code'] = {contains: req.param('res_type_code').trim()};
        }
        if (req.param('icon_path') && req.param('icon_path').trim() !== '') {
          obj['icon_path'] = {contains: req.param('icon_path').trim()};
        }
        if (req.param('path') && req.param('path').trim() !== '') {
          obj['path'] = {contains: req.param('path').trim()};
        }
        if (req.param('description') && req.param('description').trim() !== '') {
          obj['description'] = {contains: req.param('description').trim()};
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

        let data = await Xt_resource.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        }).populate('res_type_code').populate('parent_id');
        var count = await Xt_resource.count(obj);
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
      let xt_resource = {};
      if (id) {
        xt_resource = await Xt_resource.findOne({id: id});
      }
      let types = await Xt_dict.find({
        parent_id: 'resource_type'
      });
      let resources = await Xt_resource.find({
        parent_id: null,
        deleted: 0
      });
      return res.view({layout: 'admin/layout', xt_resource: xt_resource, types: types, resources: resources});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Xt_resource.update({id: id}, obj);
        } else {
          result = await Xt_resource.create(obj);
        }

        res.json({
          errCode: 0,
          msg: id ? '修改成功' : '添加成功',
          data: result
        });
      } catch (e) {
        console.log(e);
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
      var result = await Xt_resource.update({id: id}, {deleted: 1});
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
  }

};
