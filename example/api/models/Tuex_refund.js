/**
 * 退款申请表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    student_id: {  // student_id
      model:"tuex_member"
    },
    order_id: {  // 订单id
      model:"tuex_courseorder"
    },
    orderitem_id:{ // 子订单id
      model:'tuex_courseorderitem'
    },
    amount: {  // 退款金额
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    status: {  // 状态 0:待审核 2：审核成功 1：审核失败
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    type:{ //退款类型 0：全部订单，1：单个订单
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    refund_desc: {  // 退款原因
      type: 'string',
      maxLength: 300,
      allowNull: true,
      columnType: 'varchar(300)'
    },
    refuse_desc: {  // 拒绝原因
      type: 'string',
      maxLength: 300,
      allowNull: true,
      columnType: 'varchar(300)'
    },
  }

};

