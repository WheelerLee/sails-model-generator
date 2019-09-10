/**
 * Created by WheelerLee.
 * admin/Tuex_couponController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_coupon/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_coupon/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('amount') && req.param('amount').trim() !== '') {
          obj['amount'] = req.param('amount').trim();
        }
        if (req.param('big_amount') && req.param('big_amount').trim() !== '') {
          obj['big_amount'] = req.param('big_amount').trim();
        }
        if (req.param('desc') && req.param('desc').trim() !== '') {
          obj['desc'] = {contains: req.param('desc').trim()};
        }
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = req.param('status').trim();
        }
        if (req.param('validity_priod') && req.param('validity_priod').trim() !== '') {
          obj['validity_priod'] = req.param('validity_priod').trim();
        }
        if (req.param('code') && req.param('code').trim() !== '') {
          obj['code'] = {contains: req.param('code').trim()};
        }
        if (req.param('num') && req.param('num').trim() !== '') {
          obj['num'] = req.param('num').trim();
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

        let data = await Tuex_coupon.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_coupon.count(obj);
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
      let tuex_coupon = {};
      if (id) {
        tuex_coupon = await Tuex_coupon.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_coupon: tuex_coupon});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_coupon.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_coupon.create(obj);
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
      var result = await Tuex_coupon.update({id: id}, {deleted: 1});
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
