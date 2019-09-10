/**
 * 登录记录表
 *
 * @description :: TODO: 保存教师端、学生端的登录记录.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    member_id: {  // device_id
      model: "tuex_member"
    },
    place: {  // 登录地点 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    ip: {  // 登录ip 
      type: 'string',
      maxLength: 30,
      allowNull: true,
      columnType: 'varchar(30)'
    },
    device_name: {  // 登录设备名称 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
  }

};

