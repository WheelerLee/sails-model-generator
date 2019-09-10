/**
* 优惠券表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    name: {  // 名称 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    amount: {  // 金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    big_amount: {  // 满多少使用 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    desc: {  // 简介 
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    status: {  // 状态 ////0：发布 1：停止使用
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    validity_priod: {  // 有效期 ////领取后有效日期
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    code: { //领取码
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    num: { //数量
      type: 'number',
      allowNull: true,
      columnType: 'int'
    }
  }

};

