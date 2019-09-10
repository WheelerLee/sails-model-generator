/**
* 学生邀请表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    invite_member: {  // invite_member 
      model:"tuex_member"
    },
    register_member: {  // register_member 
      model:"tuex_member"
    },
    register_time: {  // register_time 
      type: 'number',
      allowNull: true,

    },
    invite_code: {  // invite_code 
      type: 'string',
      maxLength: 50,
      allowNull: true,
      columnType: 'varchar(50)'
    },
  }

};

