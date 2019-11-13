/**
 * 短信发送记录表
 * 2019-08-25 14:01.
 *
 * @author WheelerLee https://github.com/WheelerLee
 * @copyright 2019 
 */
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
    check_code: {  // 验证码类的信息，此次保存验证码
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    text: {  // 短信的具体内容
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    type: {  // type  0：验证码短信 1：通知短信
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo: 0
    },
    status: {  // status  0:未使用 1已使用
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo: 0
    },
    ip: {  // ip 发送者的IP地址
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    }
  }

};
