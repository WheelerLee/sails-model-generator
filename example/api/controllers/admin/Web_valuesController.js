/**
 * Created by WheelerLee.
 * admin/Web_valuesController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Web_values/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Web_values/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('data_type') && req.param('data_type').trim() !== '') {
          obj['data_type'] = {contains: req.param('data_type').trim()};
        }
        if (req.param('props_id') && req.param('props_id').trim() !== '') {
          obj['props_id'] = {contains: req.param('props_id').trim()};
        }
        if (req.param('object_id') && req.param('object_id').trim() !== '') {
          obj['object_id'] = {contains: req.param('object_id').trim()};
        }
        if (req.param('values_text') && req.param('values_text').trim() !== '') {
          obj['values_text'] = {contains: req.param('values_text').trim()};
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

        let data = await Web_values.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Web_values.count(obj);
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
      let web_values = {};
      if (id) {
        web_values = await Web_values.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', web_values: web_values});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Web_values.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Web_values.create(obj);
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
      var result = await Web_values.update({id: id}, {deleted: 1});
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
