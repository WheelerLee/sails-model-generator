/**
* 系统日志表
*
* @description :: TODO: 系统日志.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    user_id: {  // user_id 
      model:"xt_user"
    },
    user_name: {  // user_name 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    content: {  // content 
      type: 'string',
      maxLength: 2000,
      allowNull: true,
      columnType: 'varchar(2000)'
    },
    type: {  // type 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
  }

};

