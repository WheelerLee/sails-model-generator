/**
* 家长代付表
*
* @description :: TODO: 家长代付表.
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
    amount: {  // 金额：分
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    status: { //状态 0:待支付 1:支付成功 2:取消支付
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo: 0
    }
  }

};

