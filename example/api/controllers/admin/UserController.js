/**
 * Created by WheelerLee on 2018-05-09 13:27.
 * UserController
 * Copyright 2017 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      return res.view({layout: 'admin/layout'});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var nick_name = req.param('nick_name');
        var obj = {};
        if (nick_name) {
          obj.nick_name = {
            contains: nick_name
          };
        }

        let data = await Xt_user.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Xt_user.count(obj);
        res.json({
          code: 0,
          msg: '',
          count: count,
          data: data
        });
      } catch (e) {
        console.log(e);
        res.json({
          code: 1,
          msg: '获取失败'
        });
      }
    }
  },

  /**
   * 个人信息
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  info: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      let user = await Xt_user.findOne({id: req.session.admin.id});
      let sex = await Xt_dict.find({
        where: {parent_id: 'user_sex'},
        sort: 'sorted_num desc'
      });
      return res.view({layout: 'admin/layout', user: user, sex: sex});
    } else {
      let nick_name = req.param('nick_name');
      let sex = req.param('sex');
      let descriptions = req.param('descriptions');

      await Xt_user.update({id: req.session.admin.id}, {nick_name: nick_name, sex: sex, descriptions: descriptions});

      res.json({
        errCode: 0,
        msg: '保存成功'
      });

    }
  },

  /**
   * 修改密码
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  change_pwd: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      return res.view({layout: 'admin/layout'});
    } else {
      let old_pwd = req.param('old_pwd');
      let new_pwd = req.param('new_pwd');
      let new_pwd2 = req.param('new_pwd2');

      if (new_pwd !== new_pwd2) {
        return res.json({errCode: 1, msg: '两次密码不一致'});
      }

      let user = await Xt_user.findOne({id: req.session.admin.id});
      if (user.password !== PasswordService.pwd(old_pwd)) {
        return res.json({errCode: 1, msg: '旧密码错误'});
      }

      await Xt_user.update({id: req.session.admin.id}, {password: PasswordService.pwd(new_pwd)});

      res.json({
        errCode: 0,
        msg: '保存成功'
      });

    }
  },

  /**
   * 登录
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  login: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      res.view({layout: 'admin/layout'});
    } else {
      var login_name = req.param('username');
      var password = req.param('password', '');
      password = PasswordService.pwd(password);

      var user = await(Xt_user.findOne({login_name: login_name, password: password, deleted: 0}));
      if (user) {
        req.session.admin = user;
        res.json({errCode: 0, msg: '登录成功'});
      } else {
        res.json({errCode: 1, msg: '用户名或密码错误'});
      }

    }
  },

  /**
   * 退出登录
   * @param req
   * @param res
   */
  logout: function (req, res) {
    delete req.session.admin;
    res.redirect('login');
  }

};
