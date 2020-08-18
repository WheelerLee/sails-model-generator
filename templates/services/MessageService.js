/**
 * 此代码由生成器生成，如有问题，请联系作者 https://github.com/wheelerlee
 */
const Queue = require('promise-queue-plus');
const admin = require('firebase-admin');
const Nexmo = require('nexmo');

//Realize a queue with a maximum concurrency of 1
const queue = Queue(10, {
  'retry': 0,               //Number of retries
  'retryIsJump': false,     //retry now?
  'timeout': 0,            //The timeout period
  'autoRun': true
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
      queue.push(MessageService.send, [member.id, message]);
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
          color: sails.settings.firebase_settings.android_color || '#ffffff',
          icon: ails.settings.firebase_settings.android_icon || 'ic_launcher'
        }
      },
      data: data,
      token: member.fcm_token
    });

    return true;

  },

  /**
   * 发送短信
   * @param {string} area_code 区号，不要带+
   * @param {string} mobile_num 手机号
   * @param {string} check_code 验证码
   * @param {string} text 短信的具体内容
   * @param {string} ip 发送者的ip地址
   */
  sms: async function(area_code, mobile_num, check_code, text, ip) {
    await Msg_sms_record.create({
      area_code: area_code,
      mobile_num: mobile_num,
      check_code: check_code,
      text: text,
      type: check_code ? 0 : 1,
      status: 0,
      ip: ip
    });
    queue.push(MessageService.sms_by_nexmo, [`${area_code}${mobile_num}`, text]);
  },

  /**
   * 使用nexmo发送短信
   * @param {string} to 接收的号码
   * @param {string} text 短信内容
   */
  sms_by_nexmo: function (to, text) {
    return new Promise(function(resolve) {
      if (!sails.settings.nexmo_setting || !sails.settings.nexmo_setting.nexmo_api_key
        || !sails.settings.nexmo_setting.nexmo_api_secret || !sails.settings.nexmo_setting.nexmo_from) {
        sails.log.error('请先设置nexmo的相关参数，才能正常使用nexmo的服务');
        return resolve(false);
      }
      const nexmo = new Nexmo({
        apiKey: sails.settings.nexmo_setting.nexmo_api_key,
        apiSecret: sails.settings.nexmo_setting.nexmo_api_secret
      });
      nexmo.message.sendSms(sails.settings.nexmo_setting.nexmo_from, to, text, function(err, response) {
        if (err) {
          sails.log.error(err);
          resolve(false);
        } else {
          sails.log.debug(response);
          resolve(true);
        }
      });
    });
  }

};
