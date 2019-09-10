/**
 * Created by WheelerLee.
 * admin/Tuex_courseorderitemController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_courseorderitem/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_courseorderitem/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('price') && req.param('price').trim() !== '') {
          obj['price'] = req.param('price').trim();
        }
        if (req.param('course_name') && req.param('course_name').trim() !== '') {
          obj['course_name'] = {contains: req.param('course_name').trim()};
        }
        if (req.param('course_date') && req.param('course_date').trim() !== '') {
          obj['course_date'] = {contains: req.param('course_date').trim()};
        }
        if (req.param('start_time') && req.param('start_time').trim() !== '') {
          obj['start_time'] = {contains: req.param('start_time').trim()};
        }
        if (req.param('end_time') && req.param('end_time').trim() !== '') {
          obj['end_time'] = {contains: req.param('end_time').trim()};
        }
        if (req.param('times') && req.param('times').trim() !== '') {
          obj['times'] = {contains: req.param('times').trim()};
        }
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = req.param('status').trim();
        }
        if (req.param('cancel_desc') && req.param('cancel_desc').trim() !== '') {
          obj['cancel_desc'] = {contains: req.param('cancel_desc').trim()};
        }
        if (req.param('canceltime') && req.param('canceltime').trim() !== '') {
          obj['canceltime'] = req.param('canceltime').trim();
        }
        if (req.param('cancel_type') && req.param('cancel_type').trim() !== '') {
          obj['cancel_type'] = req.param('cancel_type').trim();
        }
        if (req.param('refuse_desc') && req.param('refuse_desc').trim() !== '') {
          obj['refuse_desc'] = {contains: req.param('refuse_desc').trim()};
        }
        if (req.param('start_class_time') && req.param('start_class_time').trim() !== '') {
          obj['start_class_time'] = req.param('start_class_time').trim();
        }
        if (req.param('end_class_time') && req.param('end_class_time').trim() !== '') {
          obj['end_class_time'] = req.param('end_class_time').trim();
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

        let data = await Tuex_courseorderitem.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_courseorderitem.count(obj);
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
      let tuex_courseorderitem = {};
      if (id) {
        tuex_courseorderitem = await Tuex_courseorderitem.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_courseorderitem: tuex_courseorderitem});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_courseorderitem.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_courseorderitem.create(obj);
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
      var result = await Tuex_courseorderitem.update({id: id}, {deleted: 1});
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
