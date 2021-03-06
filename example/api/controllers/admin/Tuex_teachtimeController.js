/**
 * Created by WheelerLee.
 * admin/Tuex_teachtimeController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_teachtime/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_teachtime/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('course_day') && req.param('course_day').trim() !== '') {
          obj['course_day'] = req.param('course_day').trim();
        }
        if (req.param('start_time') && req.param('start_time').trim() !== '') {
          obj['start_time'] = {contains: req.param('start_time').trim()};
        }
        if (req.param('end_time') && req.param('end_time').trim() !== '') {
          obj['end_time'] = {contains: req.param('end_time').trim()};
        }
        if (req.param('course_date') && req.param('course_date').trim() !== '') {
          obj['course_date'] = {contains: req.param('course_date').trim()};
        }
        if (req.param('once') && req.param('once').trim() !== '') {
          obj['once'] = req.param('once').trim();
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

        let data = await Tuex_teachtime.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_teachtime.count(obj);
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
      let tuex_teachtime = {};
      if (id) {
        tuex_teachtime = await Tuex_teachtime.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_teachtime: tuex_teachtime});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_teachtime.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_teachtime.create(obj);
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
      var result = await Tuex_teachtime.update({id: id}, {deleted: 1});
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
