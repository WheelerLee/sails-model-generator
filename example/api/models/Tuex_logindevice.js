/**
* 登录设备表
*
* @description :: TODO: 保存教师端、学生端的登录设备.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    member_id: {  // 用户编号
      model:"tuex_member"
    },
    user_type: {  // 用户类型 teacher | student | guardian
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    device_id: {  // 设备唯一标识
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    name: {  // 设备名称 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    desc: {  // 设备简介 
      type: 'string',
      maxLength: 300,
      allowNull: true,
      columnType: 'varchar(300)'
    },
/*    mobile: {  // 设备号码
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },*/
  }

};

