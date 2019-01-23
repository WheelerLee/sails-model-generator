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
    if (req.method.toLowerCase() === 'get') {
      let email_settings = sails.settings.email_settings;
      return res.view({layout: 'admin/layout', email_settings: email_settings});
    } else {

      // {id: 'email_host', value: ''},
      // {id: 'email_port', value: ''},
      // {id: 'email_user', value: ''},
      // {id: 'email_password', value: ''},
      // {id: 'email_secure', value: '0'},
      // {id: 'email_sender', value: ''}

      let email_host = req.param('email_host');
      let email_port = req.param('email_port');
      let email_user = req.param('email_user');
      let email_password = req.param('email_password');
      let email_secure = req.param('email_secure') === 'on' ? '1' : '0';
      let email_sender = req.param('email_sender');

      // let email_settings = sails.settings.email_settings;
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
  }

};