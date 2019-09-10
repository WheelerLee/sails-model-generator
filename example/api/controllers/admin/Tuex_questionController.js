/**
 * Created by WheelerLee.
 * admin/Tuex_questionController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_question/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_question/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('title') && req.param('title').trim() !== '') {
          obj['title'] = {contains: req.param('title').trim()};
        }
        if (req.param('pics') && req.param('pics').trim() !== '') {
          obj['pics'] = {contains: req.param('pics').trim()};
        }
        if (req.param('content') && req.param('content').trim() !== '') {
          obj['content'] = {contains: req.param('content').trim()};
        }
        if (req.param('hot') && req.param('hot').trim() !== '') {
          obj['hot'] = req.param('hot').trim();
        }
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = req.param('status').trim();
        }
        if (req.param('days') && req.param('days').trim() !== '') {
          obj['days'] = req.param('days').trim();
        }
        if (req.param('amount') && req.param('amount').trim() !== '') {
          obj['amount'] = req.param('amount').trim();
        }
        if (req.param('type') && req.param('type').trim() !== '') {
          obj['type'] = req.param('type').trim();
        }
        if (req.param('have_answer') && req.param('have_answer').trim() !== '') {
          obj['have_answer'] = req.param('have_answer').trim();
        }
        if (req.param('is_select') && req.param('is_select').trim() !== '') {
          obj['is_select'] = req.param('is_select').trim();
        }
        if (req.param('select_time') && req.param('select_time').trim() !== '') {
          obj['select_time'] = req.param('select_time').trim();
        }
        if (req.param('end_time') && req.param('end_time').trim() !== '') {
          obj['end_time'] = req.param('end_time').trim();
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

        let data = await Tuex_question.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_question.count(obj);
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
      let tuex_question = {};
      if (id) {
        tuex_question = await Tuex_question.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_question: tuex_question});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_question.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_question.create(obj);
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
      var result = await Tuex_question.update({id: id}, {deleted: 1});
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
