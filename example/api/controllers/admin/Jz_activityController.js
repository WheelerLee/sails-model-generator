/**
 * Created by WheelerLee.
 * admin/Jz_activityController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Jz_activity/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Jz_activity/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('title') && req.param('title').trim() !== '') {
          obj['title'] = {contains: req.param('title').trim()};
        }
        if (req.param('description') && req.param('description').trim() !== '') {
          obj['description'] = {contains: req.param('description').trim()};
        }
        if (req.param('details') && req.param('details').trim() !== '') {
          obj['details'] = {contains: req.param('details').trim()};
        }
        if (req.param('verify_status') && req.param('verify_status').trim() !== '') {
          obj['verify_status'] = {contains: req.param('verify_status').trim()};
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

        let data = await Jz_activity.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Jz_activity.count(obj);
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
      let jz_activity = {};
      if (id) {
        jz_activity = await Jz_activity.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', jz_activity: jz_activity});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Jz_activity.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Jz_activity.create(obj);
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
      var result = await Jz_activity.update({id: id}, {deleted: 1});
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
