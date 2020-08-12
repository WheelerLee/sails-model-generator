/**
 * Created by WheelerLee.
 * admin/Pay_inoutdetailController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Pay_inoutdetail/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Pay_inoutdetail/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('price') && req.param('price').trim() !== '') {
          obj['price'] = req.param('price').trim();
        }
        if (req.param('type') && req.param('type').trim() !== '') {
          obj['type'] = req.param('type').trim();
        }
        if (req.param('url') && req.param('url').trim() !== '') {
          obj['url'] = {contains: req.param('url').trim()};
        }
        if (req.param('title') && req.param('title').trim() !== '') {
          obj['title'] = {contains: req.param('title').trim()};
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

        let data = await Pay_inoutdetail.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Pay_inoutdetail.count(obj);
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
      let pay_inoutdetail = {};
      if (id) {
        pay_inoutdetail = await Pay_inoutdetail.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', pay_inoutdetail: pay_inoutdetail});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Pay_inoutdetail.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Pay_inoutdetail.create(obj);
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
      var result = await Pay_inoutdetail.update({id: id}, {deleted: 1});
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
