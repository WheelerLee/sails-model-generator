module.exports = {

  attributes: {
    activity_id: {  //活动ID
      model:"Jz_activity"
    },
    img_url: {  //上传图片地址
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    verify_status: {  //审核状态
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    user_name: {  //参与人形象
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    mobile_num: {  //参与人手机号码
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },

    count:{
      type:"number"
    },

    email: {  //邮箱
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    wallet_address: {
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    subscription_q: { //
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    subject: {  //主题
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    content: {  //内容
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    }
  }
};
