/**
* 用户设备表
*
* @description :: TODO: 推送使用，聊天模块使用.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    device_id: {  // device_id 
      model:"tuex_logindevice"
    },
    type: {  // type 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    member_id: {  // member_id 
      model:"tuex_member"
    },
  }

};

