/**
 * Admin/ManagerController
 *
 * @description :: 管理员相关的操作
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');

module.exports = {

  /**
   * 管理员列表以及接口
   */
  index: async(function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      res.view({layout: 'admin/layout'});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 30));
        var name = req.param('name', '');
        var nick_name = req.param('nick_name', '');
        var login_name = req.param('login_name', '');

        var obj = {logic_delete: 0};
        if (name) obj.name = {contains: name};
        if (nick_name) obj.nick_name = {contains: nick_name};
        if (login_name) obj.login_name = {contains: login_name};

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
   * 编辑以及添加管理员
   */
  add: async(function (req, res) {

    if (req.method.toLowerCase() === 'get') {

      var id = req.param('id');
      var manager = {};

      if (id) {
        manager = await(Xt_user.findOne({id: id}));
      }

      var user_role = await(Xt_user_role.findOne({user_id: id})) || {};
      var roles = await(Xt_role.find({sort: 'sorted_num asc'}));

      return res.view({layout: 'admin/layout', manager: manager, roles: roles, user_role: user_role});
    }

    try {
      var id = req.param('id');
      var user_role = req.param('user_role');
      var login_name = req.param('login_name');
      var obj = req.body;

      if (!login_name) {
        return res.json({
          errCode: 1,
          msg: '登录名不能为空!'
        });
      }
      if (!user_role) {
        return res.json({
          errCode: 1,
          msg: '请选择所属角色!'
        });
      }

      if (id) {

        var exist_user = await(Xt_user.findOne({login_name: login_name, id: {'!': id}}));
        if (exist_user) {
          return res.json({
            errCode: 1,
            msg: '登录名已经被使用了，换一个试试!'
          });
        }

        if (obj.password.length === 0) {
          delete obj.password;
        } else {

          if (obj.password.length < 6 || obj.password.length > 18) {
            return res.json({
              errCode: 1,
              msg: '密码长度为6-18位!'
            });
          }
          obj.password = PasswordService.pwd(obj.password);
        }

        var result = await(Xt_user.update({id: id}, obj));
        await(Xt_user_role.destroy({user_id: id}));
        await(Xt_user_role.create({user_id: id, role_id: user_role, create_user: req.session.admin.id}));

        return res.json({
          errCode: 0,
          msg: '修改成功',
          data: result
        });
      } else {

        var exist_user = await(Xt_user.findOne({login_name: login_name}));
        if (exist_user) {
          return res.json({
            errCode: 1,
            msg: '登录名已经被使用了，换一个试试!'
          });
        }

        if (obj.password.length < 6 || obj.password.length > 18) {
          return res.json({
            errCode: 1,
            msg: '密码长度为6-18位!'
          });
        }

        obj.create_user = req.session.admin.id;
        obj.password = PasswordService.pwd(obj.password);
        var result = await(Xt_user.create(obj));

        await(Xt_user_role.create({role_id: user_role, user_id: result, create_user: req.session.admin.id}));

        res.json({
          errCode: 0,
          msg: '添加成功'
        });
      }
    } catch (e) {
      console.log(e);
      res.json({
        errCode: 1,
        msg: '操作失败,请重试!'
      });
    }

  }),

  /**
   * 删除管理员，使用逻辑删除
   */
  delete: async(function (req, res) {
    var id = req.param('id');
    if (!id) {

      return res.json({
        errCode: 1,
        msg: '服务器异常，请刷新页面后再试!'
      });

    }

    try {
      await(Xt_user.update({id: id}, {logic_delete: 1}));
      return res.json({
        errCode: 0,
        msg: '删除成功!'
      });
    } catch (e) {
      return res.json({
        errCode: 1,
        msg: '服务器异常，请刷新页面后再试!'
      });
    }

  })

};

