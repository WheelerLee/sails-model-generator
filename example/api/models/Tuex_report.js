/**
 * 投诉答案反馈表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    member_id: {  // 投诉人编号
      model:"tuex_member"
    },
    question_id: {  // 投诉问题编号
      model:"tuex_question"
    },
    answer_id: {  // 投诉答案编号
      model:"tuex_answer"
    },
    report_type: {  // 投诉人类型  teacher | student | guardian
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    content: {  // 投诉内容
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
  }

};

