/**
 * Created by WheelerLee.
 * admin/CountryController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Country/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Country/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('code') && req.param('code').trim() !== '') {
          obj['code'] = {contains: req.param('code').trim()};
        }
        if (req.param('all_name') && req.param('all_name').trim() !== '') {
          obj['all_name'] = {contains: req.param('all_name').trim()};
        }
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('type') && req.param('type').trim() !== '') {
          obj['type'] = {contains: req.param('type').trim()};
        }
        if (req.param('area_code') && req.param('area_code').trim() !== '') {
          obj['area_code'] = {contains: req.param('area_code').trim()};
        }
        if (req.param('dns_name') && req.param('dns_name').trim() !== '') {
          obj['dns_name'] = {contains: req.param('dns_name').trim()};
        }
        if (req.param('time_diff') && req.param('time_diff').trim() !== '') {
          obj['time_diff'] = {contains: req.param('time_diff').trim()};
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

        let data = await Country.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Country.count(obj);
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
      let country = {};
      if (id) {
        country = await Country.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', country: country});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Country.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Country.create(obj);
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
      var result = await Country.update({id: id}, {deleted: 1});
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
