/**
* 提现申请表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },
    bankcard_id: {  // bankcard_id 
      model:"tuex_withdrawcard"
    },
    amount: {  // 提现金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    left_money: {  // 手续费 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    act_money: {  // 实际金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    status: {  // 状态 0:待审核 2：审核成功 1：审核失败
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    refuse_desc: {  // 拒绝原因 
      type: 'string',
      maxLength: 300,
      allowNull: true,
      columnType: 'varchar(300)'
    },
  }

};

