/**
* 教师学校表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },
    name: {  // 学校名称 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    start_date: {  // 开始时间 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'

    },
    end_date: {  // 结束时间 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'

    },
    degree: {  // 学历 
     model:"Xt_dict"
    },
    subject: {  // 专业 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
  }

};

