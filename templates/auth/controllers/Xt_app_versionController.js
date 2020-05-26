/**
 * Created by WheelerLee.
 * admin/Xt_app_versionController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Xt_app_version/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Xt_app_version/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('version_code') && req.param('version_code').trim() !== '') {
          obj['version_code'] = req.param('version_code').trim();
        }
        if (req.param('version_name') && req.param('version_name').trim() !== '') {
          obj['version_name'] = {contains: req.param('version_name').trim()};
        }
        if (req.param('silence') && req.param('silence').trim() !== '') {
          obj['silence'] = req.param('silence').trim();
        }
        if (req.param('force_update') && req.param('force_update').trim() !== '') {
          obj['force_update'] = req.param('force_update').trim();
        }
        if (req.param('store_update') && req.param('store_update').trim() !== '') {
          obj['store_update'] = req.param('store_update').trim();
        }
        if (req.param('platform') && req.param('platform').trim() !== '') {
          obj['platform'] = {contains: req.param('platform').trim()};
        }
        if (req.param('content') && req.param('content').trim() !== '') {
          obj['content'] = {contains: req.param('content').trim()};
        }
        if (req.param('url') && req.param('url').trim() !== '') {
          obj['url'] = {contains: req.param('url').trim()};
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

        let data = await Xt_app_version.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'version_code desc'
        });
        var count = await Xt_app_version.count(obj);
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
      let xt_app_version = {};
      if (id) {
        xt_app_version = await Xt_app_version.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', xt_app_version: xt_app_version});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Xt_app_version.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Xt_app_version.create(obj);
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
      var result = await Xt_app_version.update({id: id}, {deleted: 1});
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
