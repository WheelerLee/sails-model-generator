/**
* 答案浏览记录
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    question_id: {  // 问题
      model:"tuex_question"
    },
    student_id: {  // 用户 ////项目内就是student
      model:"tuex_member"
    },
    payment_num: {  // 支付金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
  }

};

