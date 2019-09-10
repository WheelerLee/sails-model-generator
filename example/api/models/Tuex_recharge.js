/**
* 充值记录表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    student_id: {  // student_id 
      model: "tuex_member"
    },
    amount: {  // 充值金额 实付金额，不包含优惠券送的金额
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    coupon_record_id: {
      model: "Tuex_coupon_record"
    },
    type: {  // 充值方式   0:支付寶，1：微信,2：信用卡，3：家長支付
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo:0
    },
    status: {  // 状态 ////1：充值失败:0：充值成功
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
  }

};

