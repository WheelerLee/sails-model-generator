/**
 * 回答表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    teacher_id: {  // teacher_id 
      model: "tuex_member"
    },
    question_id: {  // 问题编号 
      model: "tuex_question"
    },
    content: {  // 内容 
      type: 'string',
      maxLength: 400,
      allowNull: true,
      columnType: 'varchar(400)'
    },
    pic: {  // 图片 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    is_answer: {  // 是否选为正确答案 ////0：未选择  1：选择
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo: 0
    },
    end_time: {  // 答题结束时间 
      type: 'number',
      allowNull: true,
    },
    display_status: {  // 显示状态 ////0：显示  1：不显示
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo: 0
    },
    view_fee: {  // 查看收取费用金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
  }

};

