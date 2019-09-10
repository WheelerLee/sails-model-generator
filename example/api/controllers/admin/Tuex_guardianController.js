/**
 * Created by WheelerLee.
 * admin/Tuex_guardianController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_guardian/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_guardian/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('student_id') && req.param('student_id').trim() !== '') {
          obj['student_id'] = {contains: req.param('student_id').trim()};
        }
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('relationship') && req.param('relationship').trim() !== '') {
          obj['relationship'] = {contains: req.param('relationship').trim()};
        }
        if (req.param('area_code') && req.param('area_code').trim() !== '') {
          obj['area_code'] = {contains: req.param('area_code').trim()};
        }
        if (req.param('mobile') && req.param('mobile').trim() !== '') {
          obj['mobile'] = {contains: req.param('mobile').trim()};
        }
        if (req.param('password') && req.param('password').trim() !== '') {
          obj['password'] = {contains: req.param('password').trim()};
        }
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = {contains: req.param('status').trim()};
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

        let data = await Tuex_guardian.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_guardian.count(obj);
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
      let tuex_guardian = {};
      if (id) {
        tuex_guardian = await Tuex_guardian.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_guardian: tuex_guardian});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_guardian.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_guardian.create(obj);
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
      var result = await Tuex_guardian.update({id: id}, {deleted: 1});
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
