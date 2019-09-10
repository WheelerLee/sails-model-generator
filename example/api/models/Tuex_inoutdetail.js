/**
* 收支明细表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    title: {  // 标题 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    classes: {  // 收支来源分类（枚举） ////充值、消费、回答问题、提现等
      model:"xt_dict"
    },
    topic_member: {  // 收支用户 ////student or teacher
      model:"tuex_member"
    },
    total_price: {  // 总金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    price: {  // 实际金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    coupon_id: {  // 优惠券
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    type: {  // 收支类型(枚举) ////0收取，1支出
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    desc: {  // 备注 
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    origin_id: {  // 收支来源编号 
      model:"tuex_courseorder"
    },
  }

};

