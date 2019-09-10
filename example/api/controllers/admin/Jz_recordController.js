/**
 * Created by WheelerLee.
 * admin/Jz_recordController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Jz_record/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Jz_record/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('img_url') && req.param('img_url').trim() !== '') {
          obj['img_url'] = {contains: req.param('img_url').trim()};
        }
        if (req.param('verify_status') && req.param('verify_status').trim() !== '') {
          obj['verify_status'] = {contains: req.param('verify_status').trim()};
        }
        if (req.param('user_name') && req.param('user_name').trim() !== '') {
          obj['user_name'] = {contains: req.param('user_name').trim()};
        }
        if (req.param('mobile_num') && req.param('mobile_num').trim() !== '') {
          obj['mobile_num'] = {contains: req.param('mobile_num').trim()};
        }
        if (req.param('count') && req.param('count').trim() !== '') {
          obj['count'] = req.param('count').trim();
        }
        if (req.param('email') && req.param('email').trim() !== '') {
          obj['email'] = {contains: req.param('email').trim()};
        }
        if (req.param('wallet_address') && req.param('wallet_address').trim() !== '') {
          obj['wallet_address'] = {contains: req.param('wallet_address').trim()};
        }
        if (req.param('subscription_q') && req.param('subscription_q').trim() !== '') {
          obj['subscription_q'] = {contains: req.param('subscription_q').trim()};
        }
        if (req.param('subject') && req.param('subject').trim() !== '') {
          obj['subject'] = {contains: req.param('subject').trim()};
        }
        if (req.param('content') && req.param('content').trim() !== '') {
          obj['content'] = {contains: req.param('content').trim()};
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

        let data = await Jz_record.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Jz_record.count(obj);
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
      let jz_record = {};
      if (id) {
        jz_record = await Jz_record.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', jz_record: jz_record});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Jz_record.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Jz_record.create(obj);
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
      var result = await Jz_record.update({id: id}, {deleted: 1});
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
