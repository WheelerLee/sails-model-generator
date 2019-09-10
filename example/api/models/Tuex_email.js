/**
 * 客户服务邮箱表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    member_id: {  // teacher_id
      model:"tuex_member"
    },
    email: {  // email
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    },
    deal_with: {  // 是否处理 0:未处理 1：已处理
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo:0
    },
  }

};

