
module.exports = {

  attributes: {

    title: {  //标题
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    description: {  //活动描述
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    details: {  //详细信息
      type: 'string',
      allowNull: true,
      columnType: 'text'
    },
    status: {  //状态
      model:"Xt_dict"
    },
    verify_status: {  //审核状态
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
  }
};
