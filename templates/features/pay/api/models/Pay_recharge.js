/**
 * 充值表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    member: {  // 充值的会员
      model: "Xt_member"
    },
    type: {  // 充值方式  0:信用卡，1:微信,2:支付宝
      type: 'number',
      allowNull: true,
      columnType: 'integer',
      defaultsTo: 0
    },
    amount: {  // 充值金额 加拿大分
      type: 'number',
      allowNull: true,
      columnType: 'integer(11)',
    },
    status: {  // 状态  0: 充值成功 1: 充值失败 2: pending 对于大部分情况，如果充值失败，可能会一直保持pending状态
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    mch_order_no: {  //平台订单号
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)',
      unique: true
    },
    pay_order_no: {  //第三方支付订单号
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)',
      unique: true
    }
  }

};

