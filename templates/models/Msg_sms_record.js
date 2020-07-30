/**
 * 短信发送记录表
 * 2019-08-25 14:01.
 *
 * @author WheelerLee https://github.com/WheelerLee
 * @copyright 2019 
 */

const SMS_AVAILABLE_TIME = 5; //验证码的有效期，单位分钟

module.exports = {

  attributes: {
    area_code: {  // area_code
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    mobile_num: {  // mobile_num
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    check_code: {  // 验证码类的信息，此处保存验证码
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    text: {  // 短信的具体内容
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    type: {  // type  0：验证码短信 1：通知短信
      type: 'number',
      allowNull: true,
      columnType: 'integer',
      defaultsTo: 0
    },
    status: {  // status  0:未使用 1已使用
      type: 'number',
      allowNull: true,
      columnType: 'integer',
      defaultsTo: 0
    },
    ip: {  // ip 发送者的IP地址
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    }
  },

  /**
   * 检查验证码是否正确，并且标记为已用
   * @param {string} area_code 区号
   * @param {string} mobile_num 手机号
   * @param {string} check_code 验证码
   */
  checkCode: async function(area_code, mobile_num, check_code) {
    let records = await Msg_sms_record.find({
      where: {
        area_code: area_code,
        mobile_num: mobile_num,
        type: 0,
        deleted: 0,
        createdAt: { '>=': new Date().getTime() - SMS_AVAILABLE_TIME * 60 * 1000 }
      },
      limit: 1,
      sort: 'createdAt desc'
    }); //查找最新的一条短信
    if (records.length > 0 && records[0]['check_code'] === check_code && records[0]['status'] === 0) {
      await Msg_sms_record.update({
        id: records[0]['id']
      }, {
        status: 1
      });
      return true;
    } else {
      return false;
    }
  }

};
