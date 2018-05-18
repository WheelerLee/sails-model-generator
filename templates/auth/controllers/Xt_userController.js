/**
 * Created by WheelerLee.
 * admin/Xt_userController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_role/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_role/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('name') && req.param('name').trim() !== '') {
          obj['name'] = {contains: req.param('name').trim()};
        }
        if (req.param('nick_name') && req.param('nick_name').trim() !== '') {
          obj['nick_name'] = {contains: req.param('nick_name').trim()};
        }
        if (req.param('login_name') && req.param('login_name').trim() !== '') {
          obj['login_name'] = {contains: req.param('login_name').trim()};
        }
        if (req.param('password') && req.param('password').trim() !== '') {
          obj['password'] = {contains: req.param('password').trim()};
        }
        if (req.param('head_icon') && req.param('head_icon').trim() !== '') {
          obj['head_icon'] = {contains: req.param('head_icon').trim()};
        }
        if (req.param('descriptions') && req.param('descriptions').trim() !== '') {
          obj['descriptions'] = {contains: req.param('descriptions').trim()};
        }
        if (req.param('sex') && req.param('sex').trim() !== '') {
          obj['sex'] = {contains: req.param('sex').trim()};
        }
        if (req.param('user_state') && req.param('user_state').trim() !== '') {
          obj['user_state'] = req.param('user_state').trim();
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

        let data = await Xt_user.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        }).populate('sex');
        var count = await Xt_user.count(obj);
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
      let xt_user = {};
      if (id) {
        xt_user = await Xt_user.findOne({id: id});
        let ur = await Xt_user_role.findOne({
          user_id: id
        });
        xt_user.role = ur ? ur.role_id : '';
      }
      let sex = await Xt_dict.find({
        where: {
          parent_id: 'user_sex',
          deleted: 0
        },
        sort: 'sorted_num desc'
      });
      let roles = await Xt_role.find({
        where: {
          deleted: 0
        },
        sort: 'sorted_num desc'
      });
      return res.view({layout: 'admin/layout', xt_user: xt_user, sex: sex, roles: roles});
    } else {
      var id = req.param('id');
      var role = req.param('role');
      var obj = req.body || {};

      let login_name = req.param('login_name');
      let tempC = {
        login_name: login_name
      };
      if (id) {
        tempC.id = {'!=': id};
      }
      let temp = await Xt_user.find(tempC);
      if (temp.length > 0) {
        return res.json({errCode: 1, msg: '该用户名已被使用'});
      }

      if (obj.password) {
        obj.password = PasswordService.pwd(obj.password);
      }

      try {
        let result;
        let u_r;
        if (id) {
          result = await Xt_user.update({id: id}, obj).fetch();
          result = result[0];
          u_r =  await Xt_user_role.findOne({user_id: id});
        } else {
          obj.create_user = req.session.admin.id;
          result = await Xt_user.create(obj).fetch();
          u_r =  await Xt_user_role.findOne({user_id: result.id});
        }

        if (u_r) {
          await Xt_user_role.update({user_id: u_r.user_id}, {role_id: role});
        } else {
          await Xt_user_role.create({user_id: result.id, role_id: role});
        }

        res.json({
          errCode: 0,
          msg: id ? '修改成功' : '添加成功',
          data: result
        });
      } catch (e) {
        console.log(e);
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
      var result = await Xt_user.update({id: id}, {deleted: 1});
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
