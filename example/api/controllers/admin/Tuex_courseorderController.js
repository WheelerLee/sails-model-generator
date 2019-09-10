/**
 * Created by WheelerLee.
 * admin/Tuex_courseorderController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_courseorder/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_courseorder/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('order_code') && req.param('order_code').trim() !== '') {
          obj['order_code'] = {contains: req.param('order_code').trim()};
        }
        if (req.param('house_number') && req.param('house_number').trim() !== '') {
          obj['house_number'] = {contains: req.param('house_number').trim()};
        }
        if (req.param('street_name') && req.param('street_name').trim() !== '') {
          obj['street_name'] = {contains: req.param('street_name').trim()};
        }
        if (req.param('mobile') && req.param('mobile').trim() !== '') {
          obj['mobile'] = {contains: req.param('mobile').trim()};
        }
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('total_money') && req.param('total_money').trim() !== '') {
          obj['total_money'] = req.param('total_money').trim();
        }
        if (req.param('coupon_money') && req.param('coupon_money').trim() !== '') {
          obj['coupon_money'] = req.param('coupon_money').trim();
        }
        if (req.param('coupon_id') && req.param('coupon_id').trim() !== '') {
          obj['coupon_id'] = {contains: req.param('coupon_id').trim()};
        }
        if (req.param('pay_money') && req.param('pay_money').trim() !== '') {
          obj['pay_money'] = req.param('pay_money').trim();
        }
        if (req.param('course_name') && req.param('course_name').trim() !== '') {
          obj['course_name'] = {contains: req.param('course_name').trim()};
        }
        if (req.param('course_count') && req.param('course_count').trim() !== '') {
          obj['course_count'] = req.param('course_count').trim();
        }
        if (req.param('cancel_desc') && req.param('cancel_desc').trim() !== '') {
          obj['cancel_desc'] = {contains: req.param('cancel_desc').trim()};
        }
        if (req.param('canceltime') && req.param('canceltime').trim() !== '') {
          obj['canceltime'] = req.param('canceltime').trim();
        }
        if (req.param('refuse_desc') && req.param('refuse_desc').trim() !== '') {
          obj['refuse_desc'] = {contains: req.param('refuse_desc').trim()};
        }
        if (req.param('cancel_type') && req.param('cancel_type').trim() !== '') {
          obj['cancel_type'] = req.param('cancel_type').trim();
        }
        if (req.param('paytime') && req.param('paytime').trim() !== '') {
          obj['paytime'] = req.param('paytime').trim();
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

        let data = await Tuex_courseorder.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_courseorder.count(obj);
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
      let tuex_courseorder = {};
      if (id) {
        tuex_courseorder = await Tuex_courseorder.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_courseorder: tuex_courseorder});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_courseorder.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_courseorder.create(obj);
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
      var result = await Tuex_courseorder.update({id: id}, {deleted: 1});
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
