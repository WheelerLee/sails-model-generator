/**
 * Created by WheelerLee.
 * admin/Xt_memberController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Xt_member/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Xt_member/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('nick_name') && req.param('nick_name').trim() !== '') {
          obj['nick_name'] = {contains: req.param('nick_name').trim()};
        }
        if (req.param('head_icon') && req.param('head_icon').trim() !== '') {
          obj['head_icon'] = {contains: req.param('head_icon').trim()};
        }
        if (req.param('area_code') && req.param('area_code').trim() !== '') {
          obj['area_code'] = {contains: req.param('area_code').trim()};
        }
        if (req.param('mobile_num') && req.param('mobile_num').trim() !== '') {
          obj['mobile_num'] = {contains: req.param('mobile_num').trim()};
        }
        if (req.param('email') && req.param('email').trim() !== '') {
          obj['email'] = {contains: req.param('email').trim()};
        }
        if (req.param('login_name') && req.param('login_name').trim() !== '') {
          obj['login_name'] = {contains: req.param('login_name').trim()};
        }
        if (req.param('password') && req.param('password').trim() !== '') {
          obj['password'] = {contains: req.param('password').trim()};
        }
        if (req.param('invite_member') && req.param('invite_member').trim() !== '') {
          obj['invite_member'] = {contains: req.param('invite_member').trim()};
        }
        if (req.param('invite_code') && req.param('invite_code').trim() !== '') {
          obj['invite_code'] = {contains: req.param('invite_code').trim()};
        }
        if (req.param('languages') && req.param('languages').trim() !== '') {
          obj['languages'] = {contains: req.param('languages').trim()};
        }
        if (req.param('sex') && req.param('sex').trim() !== '') {
          obj['sex'] = req.param('sex').trim();
        }
        if (req.param('apptoken') && req.param('apptoken').trim() !== '') {
          obj['apptoken'] = {contains: req.param('apptoken').trim()};
        }
        if (req.param('descriptions') && req.param('descriptions').trim() !== '') {
          obj['descriptions'] = {contains: req.param('descriptions').trim()};
        }
        if (req.param('registry_way') && req.param('registry_way').trim() !== '') {
          obj['registry_way'] = {contains: req.param('registry_way').trim()};
        }
        if (req.param('last_login_device') && req.param('last_login_device').trim() !== '') {
          obj['last_login_device'] = {contains: req.param('last_login_device').trim()};
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

        let data = await Xt_member.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Xt_member.count(obj);
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
      let xt_member = {};
      if (id) {
        xt_member = await Xt_member.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', xt_member: xt_member});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Xt_member.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Xt_member.create(obj);
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
      var result = await Xt_member.update({id: id}, {deleted: 1});
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
