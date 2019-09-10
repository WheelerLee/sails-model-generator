/**
 * Created by WheelerLee.
 * admin/Tuex_withdrawcardController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_withdrawcard/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_withdrawcard/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('branch_address') && req.param('branch_address').trim() !== '') {
          obj['branch_address'] = {contains: req.param('branch_address').trim()};
        }
        if (req.param('transit_number') && req.param('transit_number').trim() !== '') {
          obj['transit_number'] = {contains: req.param('transit_number').trim()};
        }
        if (req.param('istitution_number') && req.param('istitution_number').trim() !== '') {
          obj['istitution_number'] = {contains: req.param('istitution_number').trim()};
        }
        if (req.param('account_number') && req.param('account_number').trim() !== '') {
          obj['account_number'] = {contains: req.param('account_number').trim()};
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

        let data = await Tuex_withdrawcard.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_withdrawcard.count(obj);
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
      let tuex_withdrawcard = {};
      if (id) {
        tuex_withdrawcard = await Tuex_withdrawcard.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_withdrawcard: tuex_withdrawcard});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_withdrawcard.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_withdrawcard.create(obj);
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
      var result = await Tuex_withdrawcard.update({id: id}, {deleted: 1});
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
