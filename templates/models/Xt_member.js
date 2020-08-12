/**
 * 平台用户表
 * 
 * @description :: 用户表，包含一些通用的字段，如果需要扩展可以修改表或者添加一对一关联表
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nick_name: {  // nick_name 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    head_icon: {  // head_icon 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
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
    email: {  // email 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    login_name: {  // login_name 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    password: {  // password 
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    },
    invite_member: {  // invite_member 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    invite_code: {  // invite_code 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    languages: {  // languages 
      type: 'string',
      maxLength: 191,
      allowNull: true,
      columnType: 'varchar(191)'
    },
    sex: {  // sex  1，男 2.女
      type: 'number',
      allowNull: true,
      columnType: 'tinyint unsigned',
      defaultsTo: 1
    },
    balance: {  // 余额
      type: 'number',
      columnType: 'integer(11)',
      defaultsTo: 0
    },
    apptoken: {  // apptoken 
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    },
    descriptions: {  // descriptions 
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    },
    registry_way: {  // registry_way android | ios
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    last_login_device: {  // last_login_device 
      type: 'string',
      maxLength: 191,
      allowNull: true,
      columnType: 'varchar(191)'
    },
    fcm_token: {  // fcm_token 
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    }
  }

};

