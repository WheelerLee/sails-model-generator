/**
 * Created by WheelerLee.
 * admin/Tuex_inoutdetailController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_inoutdetail/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_inoutdetail/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('title') && req.param('title').trim() !== '') {
          obj['title'] = {contains: req.param('title').trim()};
        }
        if (req.param('total_price') && req.param('total_price').trim() !== '') {
          obj['total_price'] = req.param('total_price').trim();
        }
        if (req.param('price') && req.param('price').trim() !== '') {
          obj['price'] = req.param('price').trim();
        }
        if (req.param('coupon_id') && req.param('coupon_id').trim() !== '') {
          obj['coupon_id'] = {contains: req.param('coupon_id').trim()};
        }
        if (req.param('type') && req.param('type').trim() !== '') {
          obj['type'] = req.param('type').trim();
        }
        if (req.param('desc') && req.param('desc').trim() !== '') {
          obj['desc'] = {contains: req.param('desc').trim()};
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

        let data = await Tuex_inoutdetail.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_inoutdetail.count(obj);
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
      let tuex_inoutdetail = {};
      if (id) {
        tuex_inoutdetail = await Tuex_inoutdetail.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_inoutdetail: tuex_inoutdetail});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_inoutdetail.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_inoutdetail.create(obj);
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
      var result = await Tuex_inoutdetail.update({id: id}, {deleted: 1});
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
