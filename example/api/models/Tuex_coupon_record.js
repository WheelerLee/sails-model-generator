/**
* 优惠券记录表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    coupon_id: {  // coupon_id 
      model:"tuex_coupon"
    },
    student_id: {  // student_id ////领取人，项目内可以直接为student
      model:"tuex_member"
    },
    order_id: {  // 使用订单编号 
      model:"tuex_courseorder"
    },
    status: {  // 状态 ////0:未使用，1:已使用
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo: 0
    },
    endtime: {  // 有效截止时间 
      type: 'number',
      allowNull: true,
      columnType: 'bigint'
    },
    use_time: {  // 使用时间 
      type: 'number',
      allowNull: true,
      columnType: 'bigint'
    },
  }

};

