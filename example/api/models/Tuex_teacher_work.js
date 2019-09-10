/**
* 教师工作经验表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },
    name: {  // 单位名称 
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
    work_desc: {  // 工作简介 
      type: 'string',
      allowNull: true,
      columnType: 'text'
    },
  }

};

