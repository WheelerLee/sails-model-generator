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
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    login_name: {  // login_name 
      type: 'string',
      maxLength: 50,
      allowNull: true,
      columnType: 'varchar(50)'
    },
    password: {  // password 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
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
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    sex: {  // sex  1，男 2.女
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:1
    },
    apptoken: {  // apptoken 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    descriptions: {  // descriptions 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    registry_way: {  // registry_way android | ios
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    last_login_device: {  // last_login_device 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    fcm_token: {  // fcm_token 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    }
  }

};
