/**
* 平台用户表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    nick_name: {  // nick_name 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    head_icon: {  // head_icon 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    sur_name: {  // sur_name 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    name: {  // name 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    vacation_mode:{ //休假模式 0：正常工作 1：休假模式
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    teacher: {  // teacher
     model:"tuex_teacher"
    },
    type: {  // type ////0学生，1教师，2家长
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    auth_state: {  // (教师)auth_state ////0待认证，1认证中，2认证成功，3认证失败
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    identity_state:{ //教师身份认证 0：未认证 1：待审核 2：审核成功，3认证失败
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    education_state:{ //教师教育认证 0：未认证 1：待审核 2：审核成功，3认证失败
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    intelligence_state:{ //无犯罪记录认证  0：未认证 1：待审核 2：审核成功，3认证失败
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    area_code: {  // area_code 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    mobile_num: {  // mobile_num 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    email: {  // email 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    login_name: {  // login_name 
      type: 'string',
      maxLength: 50,
      allowNull: true,
      columnType: 'varchar(50)'
    },
    password: {  // password 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    pay_password:{ //支付密码
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    wechat_openid: {  // wechat_openid 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    facebook_openid: {  // facebook_openid 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    twitter_openid: {  // twitter_openid 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    invite_member: {  // invite_member 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    invite_code: {  // invite_code 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    languages: {  // languages 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    sex: {  // sex  1，男 2.女
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:1
    },
    apptoken: {  // apptoken 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    status: {  // status ////0:正常，1:锁定（备注：字段目前不需要使用，锁定账号用deleted）
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    invite_num: {  // invite_num 
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo:0
    },
    descriptions: {  // descriptions 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    my_scan: {  // my_scan 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    registry_way: {  // registry_way android | ios
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    last_login_device: {  // last_login_device 
      type: 'string',
      maxLength: 256,
      allowNull: true,
      columnType: 'varchar(256)'
    },
    balance: {  // 余额
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo:0
    },
    address: {  // 地址 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    accountStatus:{ //账户状态 0：正常 1：冻结
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo:0
    },
/*    country_id: {  // 国家
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    province_id: {  // 省份
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },*/
    grade: {  // 适合年级
      model:"xt_dict"
    },
    province_id: {  // 省份
      model: 'Province'
    },
    city_id: {  // 城市 
      model:"city"
    },
    street_name: {
      type: 'string',
      maxLength: 250,
      allowNull: true,
      columnType: 'varchar(250)'
    },
    house_number: {
      type: 'string',
      maxLength: 250,
      allowNull: true,
      columnType: 'varchar(250)'
    },
    identity_code: {  // 身份编号 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    sendbird_access_token:{
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    course_time:{ //教课时长统计(分钟)教师
      type:"number",
      columnType: 'int',
      defaultsTo:0
    },
    teach_language:{ //教学语言
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    },
    wiling_travel:{ //  0: No, Stay at my address ,1: Yes, with 30mins buffer ,2: Yes, without buffer
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo:0
    },
    stripe_customer: { //stripe支付的客户id，会保存相关的信用卡信息
      type: 'string',
      allowNull: true,
      maxLength: 255,
      columnType: 'varchar(255)'
    }
  }

};

