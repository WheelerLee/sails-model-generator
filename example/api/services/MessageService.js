/**
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
const Queue = require('promise-queue-plus');
const admin = require('firebase-admin');

//Realize a queue with a maximum concurrency of 1
const queue = Queue(10, {
  "retry":0,               //Number of retries
  "retryIsJump":false,     //retry now? 
  "timeout":0            //The timeout period
});

module.exports = {

  /**
   * 往用户发送一条站内消息
   * @param {int} member_id 接收用户
   * @param {Msg_message} message 需要发送的消息
   */
  send: async function(member_id, message) {
    await Msg_send_record.create({
      title: message.title,
      content: message.content,
      url: message.url,
      member_id: member_id
    });
    await MessageService.push_by_firebase(member_id, title, content);
  },

  /**
   * 往多个用户发送消息，用户过多会排队依次发送
   * @param {Xt_member[]} members 需要发送的用户
   * @param {Msg_message} message 发送的消息
   */
  send_all: function(members, message) {
    for (let member of members) {
      queue.push(function(a, b) {return MessageService.send(a, b)}, [member.id, message]);
    }
  },

  /**
   * 往用户设备发送推送消息
   * @param {int} member_id 接收的会员
   * @param {string} title 标题
   * @param {string} content 内容
   * @param {Object} data 发送的数据
   */
  push_by_firebase: async function(member_id, title, content, data) {
    if (!sails.settings.firebase_settings || !sails.settings.firebase_settings.databaseURL 
      || !sails.settings.firebase_settings.cert) {
        sails.log.error('请先设置firebase的相关参数，才能正常使用firebase的推送服务');
        return false;
    }
    if (!global.initializeApp) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(sails.settings.firebase_settings.cert)),
        databaseURL: sails.settings.firebase_settings.databaseURL
      });
      global.initializeApp = true;
    }    
    let member = await Xt_member.findOne({id: member_id, deleted: 0});
    if (!member || !member.fcm_token) {
      return false;
    }
    if (!data) data = {};
    admin.messaging().send({
      notification: {
        title: title,
        body: content
      },
      apns: {
        payload: {
          aps: {
            badge: 1
          }
        }
      },
      android: {
        notification: {
          color: sails.settings.firebase_settings.android_color || '#ffffff', // TODO: 此次需要修改到配置项目
          icon: ails.settings.firebase_settings.android_icon || 'ic_launcher'
        }
      },
      data: data,
      token: member.fcm_token
    });

    return true;

  }

};