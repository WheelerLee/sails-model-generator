/**
 * Created by WheelerLee.
 * admin/MessageController
 * 消息管理控制器
 * Copyright 2019 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/message/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/message/delete');
      var send_permission = await PermissionService.valid(req.session.admin.id, '/admin/message/send');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, 
        delete_permission: delete_permission, send_permission: send_permission});
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
        if (req.param('url') && req.param('url').trim() !== '') {
          obj['url'] = {contains: req.param('url').trim()};
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

        let data = await Msg_message.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Msg_message.count(obj);
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

    var id = req.param('id');
    if (req.method.toLowerCase() === 'get') {
      let msg_message = {};
      if (id) {
        msg_message = await Msg_message.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', msg_message: msg_message});
    } else {
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Msg_message.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Msg_message.create(obj);
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
      var result = await Msg_message.update({id: id}, {deleted: 1});
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
  },

  send: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      let message_id = req.param('message_id');
      return res.view({layout: 'admin/layout', message_id: message_id});
    } else {
      let message_id = req.param('message_id'); 

      if (message_id) { //表示发送需要发送消息
        let all = req.param('all'); 
        let message = await Msg_message.findOne({id: message_id, deleted: 0});
        if (!message) return res.json({errCode: 1, msg: '该消息不存在，请重新选择'});

        if (all === '1') { //表示发送查询的用户
          let nick_name = req.param('nick_name');
          let mobile_num = req.param('mobile_num');
          let obj = {
            deleted: 0
          };
          if (nick_name) obj.nick_name = {contains: nick_name.trim()};
          if (mobile_num) obj.mobile_num = {contains: mobile_num.trim()};
          let members = await Xt_member.find(obj);

          MessageService.send_all(members, message);

        } else {
          let members = req.param('members', '').split(',');
          for (let member of members) {
            MessageService.send(member, message).then(function(){}).catch(function(){});
          }
        }

        return res.json({errCode: 0, msg: '发送成功'});

      } else {
        let page = parseInt(req.param('page', '1'));
        let limit = parseInt(req.param('limit', '10')); 
        let nick_name = req.param('nick_name', '');
        let mobile_num = req.param('mobile_num', '');
  
        let obj = {
          deleted: 0
        };
        if (nick_name) obj.nick_name = {contains: nick_name.trim()};
        if (mobile_num) obj.mobile_num = {contains: mobile_num.trim()};
  
        let members = await Xt_member.find({
          where: obj,
          sort: 'createdAt asc',
          skip: (page - 1) * limit,
          limit: limit
        });
        var count = await Xt_member.count(obj);
        res.json({
          code: 0,
          msg: '',
          count: count,
          data: members
        });
      }

    }
  },

  push_list: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      return res.view({layout: 'admin/layout'});
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
        if (req.param('url') && req.param('url').trim() !== '') {
          obj['url'] = {contains: req.param('url').trim()};
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
          sort: req.param('sort') ? [req.param('sort')] : 'sorted_num desc'
        });
        for (let msg of data) {
          msg.member = await Xt_member.findOne({
            where: {
              id: msg.member_id
            },
            select: ['id', 'nick_name']
          });
        }
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

  sms_list: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      return res.view({layout: 'admin/layout'});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('mobile_num') && req.param('mobile_num').trim() !== '') {
          obj['mobile_num'] = {contains: req.param('mobile_num').trim()};
        }

        let data = await Msg_sms_record.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: req.param('sort') ? [req.param('sort')] : 'createdAt desc'
        });
        var count = await Msg_sms_record.count(obj);
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
  }

};
