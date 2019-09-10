/**
* 学生上课地址表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    student_id: {  // student_id 
      model:"tuex_member"
    },
    address: {  // 上课地址 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
  }

};

