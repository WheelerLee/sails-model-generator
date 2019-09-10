/**
 * Created by WheelerLee.
 * admin/Tuex_courseController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_course/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_course/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('main_pic') && req.param('main_pic').trim() !== '') {
          obj['main_pic'] = {contains: req.param('main_pic').trim()};
        }
        if (req.param('list_pic') && req.param('list_pic').trim() !== '') {
          obj['list_pic'] = {contains: req.param('list_pic').trim()};
        }
        if (req.param('video_link') && req.param('video_link').trim() !== '') {
          obj['video_link'] = {contains: req.param('video_link').trim()};
        }
        if (req.param('little_title') && req.param('little_title').trim() !== '') {
          obj['little_title'] = {contains: req.param('little_title').trim()};
        }
        if (req.param('desc') && req.param('desc').trim() !== '') {
          obj['desc'] = {contains: req.param('desc').trim()};
        }
        if (req.param('type') && req.param('type').trim() !== '') {
          obj['type'] = req.param('type').trim();
        }
        if (req.param('times') && req.param('times').trim() !== '') {
          obj['times'] = req.param('times').trim();
        }
        if (req.param('price') && req.param('price').trim() !== '') {
          obj['price'] = req.param('price').trim();
        }
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = req.param('status').trim();
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

        let data = await Tuex_course.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_course.count(obj);
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
      let tuex_course = {};
      if (id) {
        tuex_course = await Tuex_course.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_course: tuex_course});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_course.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_course.create(obj);
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
      var result = await Tuex_course.update({id: id}, {deleted: 1});
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
