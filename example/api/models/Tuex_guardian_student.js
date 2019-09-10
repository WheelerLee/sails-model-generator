/**
* 学生家长关系表
*
* @description :: TODO: 家长（监护人）表.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    student_id: {  // student_id 
      model:"tuex_member"
    },
    guardian_id: {  // guardian_id 
      model:"tuex_member"
    },
    relationship: {  // 关系(dict) 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
  }

};

