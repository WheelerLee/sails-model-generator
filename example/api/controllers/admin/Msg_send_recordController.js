/**
 * Created by WheelerLee.
 * admin/Msg_send_recordController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Msg_send_record/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Msg_send_record/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('title') && req.param('title').trim() !== '') {
          obj['title'] = {contains: req.param('title').trim()};
        }
        if (req.param('content') && req.param('content').trim() !== '') {
          obj['content'] = {contains: req.param('content').trim()};
        }
        if (req.param('member_id') && req.param('member_id').trim() !== '') {
          obj['member_id'] = req.param('member_id').trim();
        }
        if (req.param('url') && req.param('url').trim() !== '') {
          obj['url'] = {contains: req.param('url').trim()};
        }
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = req.param('status').trim();
        }
        if (req.param('read_time') && req.param('read_time').trim() !== '') {
          obj['read_time'] = req.param('read_time').trim();
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

        let data = await Msg_send_record.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Msg_send_record.count(obj);
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
      let msg_send_record = {};
      if (id) {
        msg_send_record = await Msg_send_record.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', msg_send_record: msg_send_record});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Msg_send_record.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Msg_send_record.create(obj);
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
      var result = await Msg_send_record.update({id: id}, {deleted: 1});
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
