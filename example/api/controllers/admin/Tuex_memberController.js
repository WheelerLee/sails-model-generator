/**
 * Created by WheelerLee.
 * admin/Tuex_memberController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_member/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_member/delete');
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
        if (req.param('sur_name') && req.param('sur_name').trim() !== '') {
          obj['sur_name'] = {contains: req.param('sur_name').trim()};
        }
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('vacation_mode') && req.param('vacation_mode').trim() !== '') {
          obj['vacation_mode'] = req.param('vacation_mode').trim();
        }
        if (req.param('type') && req.param('type').trim() !== '') {
          obj['type'] = req.param('type').trim();
        }
        if (req.param('auth_state') && req.param('auth_state').trim() !== '') {
          obj['auth_state'] = req.param('auth_state').trim();
        }
        if (req.param('identity_state') && req.param('identity_state').trim() !== '') {
          obj['identity_state'] = req.param('identity_state').trim();
        }
        if (req.param('education_state') && req.param('education_state').trim() !== '') {
          obj['education_state'] = req.param('education_state').trim();
        }
        if (req.param('intelligence_state') && req.param('intelligence_state').trim() !== '') {
          obj['intelligence_state'] = req.param('intelligence_state').trim();
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
        if (req.param('pay_password') && req.param('pay_password').trim() !== '') {
          obj['pay_password'] = {contains: req.param('pay_password').trim()};
        }
        if (req.param('wechat_openid') && req.param('wechat_openid').trim() !== '') {
          obj['wechat_openid'] = {contains: req.param('wechat_openid').trim()};
        }
        if (req.param('facebook_openid') && req.param('facebook_openid').trim() !== '') {
          obj['facebook_openid'] = {contains: req.param('facebook_openid').trim()};
        }
        if (req.param('twitter_openid') && req.param('twitter_openid').trim() !== '') {
          obj['twitter_openid'] = {contains: req.param('twitter_openid').trim()};
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
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = req.param('status').trim();
        }
        if (req.param('invite_num') && req.param('invite_num').trim() !== '') {
          obj['invite_num'] = req.param('invite_num').trim();
        }
        if (req.param('descriptions') && req.param('descriptions').trim() !== '') {
          obj['descriptions'] = {contains: req.param('descriptions').trim()};
        }
        if (req.param('my_scan') && req.param('my_scan').trim() !== '') {
          obj['my_scan'] = {contains: req.param('my_scan').trim()};
        }
        if (req.param('registry_way') && req.param('registry_way').trim() !== '') {
          obj['registry_way'] = {contains: req.param('registry_way').trim()};
        }
        if (req.param('last_login_device') && req.param('last_login_device').trim() !== '') {
          obj['last_login_device'] = {contains: req.param('last_login_device').trim()};
        }
        if (req.param('balance') && req.param('balance').trim() !== '') {
          obj['balance'] = req.param('balance').trim();
        }
        if (req.param('address') && req.param('address').trim() !== '') {
          obj['address'] = {contains: req.param('address').trim()};
        }
        if (req.param('accountStatus') && req.param('accountStatus').trim() !== '') {
          obj['accountStatus'] = req.param('accountStatus').trim();
        }
        if (req.param('street_name') && req.param('street_name').trim() !== '') {
          obj['street_name'] = {contains: req.param('street_name').trim()};
        }
        if (req.param('house_number') && req.param('house_number').trim() !== '') {
          obj['house_number'] = {contains: req.param('house_number').trim()};
        }
        if (req.param('identity_code') && req.param('identity_code').trim() !== '') {
          obj['identity_code'] = {contains: req.param('identity_code').trim()};
        }
        if (req.param('sendbird_access_token') && req.param('sendbird_access_token').trim() !== '') {
          obj['sendbird_access_token'] = {contains: req.param('sendbird_access_token').trim()};
        }
        if (req.param('course_time') && req.param('course_time').trim() !== '') {
          obj['course_time'] = req.param('course_time').trim();
        }
        if (req.param('teach_language') && req.param('teach_language').trim() !== '') {
          obj['teach_language'] = {contains: req.param('teach_language').trim()};
        }
        if (req.param('wiling_travel') && req.param('wiling_travel').trim() !== '') {
          obj['wiling_travel'] = req.param('wiling_travel').trim();
        }
        if (req.param('stripe_customer') && req.param('stripe_customer').trim() !== '') {
          obj['stripe_customer'] = {contains: req.param('stripe_customer').trim()};
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

        let data = await Tuex_member.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_member.count(obj);
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
      let tuex_member = {};
      if (id) {
        tuex_member = await Tuex_member.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_member: tuex_member});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_member.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_member.create(obj);
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
      var result = await Tuex_member.update({id: id}, {deleted: 1});
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
