/**
 * 收支明细表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    member: {  // 会员
      model: "Xt_member"
    },
    price: {  // 变动金额
      type: 'number',
      allowNull: true,
      columnType: 'integer(11)'
    },
    type: {  // 类型   0收取   1支出
      type: 'number',
      allowNull: true,
      columnType: 'tinyint unsigned',
      defaultsTo: 0
    },
    classes: {  // 收支来源
      model: "xt_dict"
    },
    url: { //深度链接的url，将通过深度链接的方式关联相关的业务页面
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    title: {  // 标题
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    desc: {  // 备注
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    }
  }

};
