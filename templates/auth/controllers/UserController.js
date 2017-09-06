/**
 * Admin/UserController
 *
 * @description :: Server-side logic for managing admin/users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var await = require('asyncawait/await');
var async = require('asyncawait/async');

module.exports = {

  /**
   * 登录页面
   * @param req
   * @param res
   */
  login: async(function (req, res) {

    if (req.method.toLowerCase() === 'post') { //post做登录验证

      var login_name = req.param('login_name');
      var password = req.param('password', '');
      password = PasswordService.pwd(password);

      var user = await(Xt_user.findOne({login_name: login_name, password: password, logic_delete: 0}));
      if (user) {

        req.session.admin = user;
        res.json({errCode: 0, msg: '登录成功'});

      } else {
        res.json({errCode: 1, msg: '用户名或密码错误'});
      }

    } else {
      res.view({layout: 'admin/layout'});
    }
  }),

  /**
   * 退出登录
   */
  logout: async(function (req, res) {
    req.session.admin = null;
    res.redirect('/admin/user/login');
  }),

  /**
   * 修改密码
   */
  change_pwd: async(function (req, res) {

    if (req.method.toLowerCase() === 'get') {
      return res.view({layout: 'admin/layout'});
    }

    try {
      var id = req.session.admin.id;
      var password = req.param('old_password', '');
      password = PasswordService.pwd(password);
      var newPwd = req.param('new_password', '');

      if (newPwd.length < 6 || newPwd.length > 18) {
        res.json({
          errCode: 1,
          msg: '新密码长度为6-18位'
        });
      }

      newPwd = PasswordService.pwd(newPwd);

      var user = await(Xt_user.findOne({id: id}));
      if (user && user.password === password) {
        var result = await(Xt_user.update({id: id}, {password: newPwd}));
        res.json({
          errCode: 0,
          msg: '密码修改成功',
          result: result
        });
      } else {
        res.json({
          errCode: 1,
          msg: '旧密码错误，请重试'
        });
      }
    } catch (e) {
      console.log(e);
      res.json({
        errCode: 1,
        msg: '系统异常，请重试'
      });
    }

  }),

  /**
   * 个人信息
   * @param req
   * @param res
   */
  info: async(function (req, res) {

    if (req.method.toLowerCase() === 'get') {

      var manager = await(Xt_user.findOne({id: req.session.admin.id}));
      res.view({layout: 'admin/layout', manager: manager});

    } else {

      try {
        var obj = req.body || {};
        // if (obj.password.length === 0) {
        //   delete obj.password;
        // } else {
        //
        //   if (obj.password.length < 6 || obj.password.length > 18) {
        //     return res.json({
        //       errCode: 1,
        //       msg: '密码长度为6-18位!'
        //     });
        //   }
        //   obj.password = PasswordService.pwd(obj.password);
        // }

        var result = await(Xt_user.update({id: req.session.admin.id}, obj));
        res.json({
          errCode: 0,
          msg: '保存成功',
          data: result
        });
      } catch (e) {

        res.json({
          errCode: 1,
          msg: '服务器异常，请重试!'
        });

      }

    }
  }),



  /**
   * 首页
   */
  index: async(function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      res.view({layout: 'admin/layout'});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 30));
        var name = req.param('name', '');
        var obj = {};
        if (name) obj.name = name;

        var count = await(Xt_user.count(obj));
        var result = await(Xt_user.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          select: ['id', 'name', 'nick_name', 'login_name', 'pingyin_name', 'head_icon',
            'native_place', 'national', 'card_num', 'mobile_num', 'office_tel_num', 'work_address',
            'email', 'weixin', 'qq', 'descriptions', 'sex', 'birthday', 'logic_delete', 'user_state', 'regist_way',
            'regist_time', 'regist_device', 'last_login_time', 'last_login_device', 'system_id'
          ]
        }));

        res.json({
          code: 0,
          msg: '',
          count: count,
          data: result
        });
      } catch (e) {
        res.json({
          code: 1,
          msg: '获取失败'
        });
      }
    }
  }),

  /**
   * 新增用户
   */
  add: async(function (req, res) {

    if (req.method.toLowerCase() === 'get') {
      return res.view({layout: 'admin/layout', user: {}});
    }

    try {
      var login_name = req.param('login_name', '');
      var password = req.param('password', 1);

      if (login_name) {
        await(Xt_user.findOne({login_name: login_name}));
        res.json({
          errCode: 1,
          msg: '用户已存在',
        });
      } else {
        var result = await(Xt_role.create({login_name: login_name, password: password}));
        res.json({
          errCode: 0,
          msg: '新增成功',
          data: result
        });
      }
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '新增失败,请重试!'
      });
    }
  }),

  /**
   * 删除用户
   */
  delete: async(function (req, res) {
    try {
      var id = req.param('id', '');
      var result = await(Xt_user.update({id:id},{logic_delete: 1}));
      res.json({
        errCode: 0,
        msg: '删除成功',
        result: result
      });
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '删除失败'
      });
    }
  }),

  /**
   * 修改用户
   */
  change: async(function (req, res) {
    try {
      var id = req.param('id', '');
      var role_id = req.param('role_id');
      if (!role_id) await(Xt_user_role.destroy({user_id: id}));
      else {
        var result = await(Xt_user_role.find({user_id: id}));
        if (result) {
          var res = await(Xt_user_role.update({user_id: id}, {role_id: role_id}));
        } else {
          var result = await(Xt_user_role.create({user_id: id, role_id: role_id}));
        }
      }
      var param = req.body;
      var result = await(Xt_user.update({id: id}, param));
      res.json({
        errCode: 0,
        msg: '修改成功',
        result: result
      });
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '修改失败'
      });
    }
  })



};



