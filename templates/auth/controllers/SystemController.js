/**
 * Created by WheelerLee.
 * admin/SystemController
 * Copyright 2019 https://github.com/WheelerLee
 */

module.exports = {

  site: async function (req, res) {

    if (req.method.toLowerCase() === 'get') {
      let site_name = sails.settings.system_settings.site_name;
      let maximum_upload_size = sails.settings.system_settings.maximum_upload_size;
      return res.view({layout: 'admin/layout', site_name: site_name, maximum_upload_size: maximum_upload_size});
    } else {
      let site_name = req.param('site_name');
      let maximum_upload_size = parseInt(req.param('maximum_upload_size')) || 1;

      sails.settings.system_settings.site_name = site_name;
      sails.settings.system_settings.maximum_upload_size = maximum_upload_size;

      await Xt_setting.update({id: 'site_name'}, {value: site_name});
      await Xt_setting.update({id: 'maximum_upload_size'}, {value: maximum_upload_size});
      res.json({
        errCode: 0,
        msg: '修改成功'
      });
    }

  },

  email: async function (req, res) {

    if (req.param('type') === 'test') {
      let body = req.body;
      body.email_secure = (body.email_secure === 'on' ? '1' : '0');
      let b = await EmailService.send(body.email_user, '测试邮件', '<b>恭喜，邮件配置成功</b>', body);
      if (b) {
        return res.json({
          errCode: 0,
          msg: '发送成功'
        });
      } else {
        return res.json({
          errCode: 1,
          msg: '发送失败'
        });
      }
    }

    if (req.method.toLowerCase() === 'get') {
      let email_settings = sails.settings.email_settings;
      return res.view({layout: 'admin/layout', email_settings: email_settings});
    } else {

      let email_host = req.param('email_host');
      let email_port = req.param('email_port');
      let email_user = req.param('email_user');
      let email_password = req.param('email_password');
      let email_secure = req.param('email_secure') === 'on' ? '1' : '0';
      let email_sender = req.param('email_sender');

      let email_settings = {
        email_host: email_host,
        email_port: email_port,
        email_user: email_user,
        email_password: email_password,
        email_secure: email_secure,
        email_sender: email_sender,
      };
      sails.settings.email_settings = email_settings;

      await Xt_setting.update({id: 'email_host'}, {value: email_host});
      await Xt_setting.update({id: 'email_port'}, {value: email_port});
      await Xt_setting.update({id: 'email_user'}, {value: email_user});
      await Xt_setting.update({id: 'email_password'}, {value: email_password});
      await Xt_setting.update({id: 'email_sender'}, {value: email_sender});
      await Xt_setting.update({id: 'email_secure'}, {value: email_secure});
      res.json({
        errCode: 0,
        msg: '修改成功'
      });
    }
  },

  preview: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      let settings = sails.settings;
      return res.view({layout: 'admin/layout', settings: settings});
    } else {
      // { email_settings: 
      //   { email_host: 'smtp.sina.com',
      //     email_password: 'aaa',
      //     email_port: '465',
      //     email_secure: '1',
      //     email_sender: '蓝源科技',
      //     email_user: 'oyliwei@sina.com' },
      //  system_settings: { maximum_upload_size: '10240', site_name: 'tuex管理系统' } }
      let json = req.allParams();

      let b = await SystemService.reset(json);
      
      let settings = await SystemService.getSettings(null);
      sails.settings = settings;

      if (b) {
        return res.json({
          errCode: 0,
          msg: '保存成功'
        });
      } else {
        return res.json({
          errCode: 1,
          msg: '保存成功'
        });
      }

    }
  },

  firebase: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      let firebase_settings = sails.settings.firebase_settings;
      return res.view({layout: 'admin/layout', firebase_settings: firebase_settings});
    } else {
      let databaseURL = req.param('databaseURL');
      let cert = req.param('cert');
      let android_icon = req.param('android_icon');
      let android_color = req.param('android_color');

      let firebase_settings = {
        databaseURL: databaseURL,
        cert: cert,
        android_icon: android_icon,
        android_color: android_color
      };
      sails.settings.firebase_settings = firebase_settings;

      await Xt_setting.update({id: 'databaseURL'}, {value: databaseURL});
      await Xt_setting.update({id: 'cert'}, {value: cert});
      await Xt_setting.update({id: 'android_icon'}, {value: android_icon});
      await Xt_setting.update({id: 'android_color'}, {value: android_color});
      res.json({
        errCode: 0,
        msg: '修改成功'
      });
    }
  },

  nexmo: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      let nexmo_setting = sails.settings.nexmo_setting;
      return res.view({layout: 'admin/layout', nexmo_setting: nexmo_setting});
    } else {
      let nexmo_api_key = req.param('nexmo_api_key');
      let nexmo_api_secret = req.param('nexmo_api_secret');
      let nexmo_from = req.param('nexmo_from');

      let nexmo_setting = {
        nexmo_api_key: nexmo_api_key,
        nexmo_api_secret: nexmo_api_secret,
        nexmo_from: nexmo_from
      };
      sails.settings.nexmo_setting = nexmo_setting;

      await Xt_setting.update({id: 'nexmo_api_key'}, {value: nexmo_api_key});
      await Xt_setting.update({id: 'nexmo_api_secret'}, {value: nexmo_api_secret});
      await Xt_setting.update({id: 'nexmo_from'}, {value: nexmo_from});
      res.json({
        errCode: 0,
        msg: '修改成功'
      });
    }
  }

};
