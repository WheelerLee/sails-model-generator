/**
 * Xt_user.js
 *
 * @description :: TODO: 系统用户-管理员.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {  //姓名
      type: 'string',
      maxLength: 50,
      columnType: 'varchar(50)',
      allowNull: true
    },
    nick_name: {  //昵称
      type: 'string',
      maxLength: 50,
      columnType: 'varchar(50)',
      allowNull: true
    },
    login_name: {   //登录名
      type: 'string',
      maxLength: 50,
      required: true,
      unique: true,
      columnType: 'varchar(50)'
    },
    password: {   //登录密码
      type: 'string',
      maxLength: 256,
      required: true,
      columnType: 'varchar(256)'
    },
    head_icon: {    //头像(附件的Id)
      type: 'string',
      maxLength: 150,
      columnType: 'varchar(150)',
      allowNull: true
    },
    descriptions: {   //个人介绍
      type: 'string',
      maxLength: 500,
      columnType: 'varchar(500)',
      allowNull: true
    },
    sex: {    //性别(DICT)
      model: 'Xt_dict'
    },
    user_state: {     //用户状态  0 正常 1 禁用
      type: 'number'
     ,
      allowNull: true,
      defaultsTo: 0
    }
  },

};

