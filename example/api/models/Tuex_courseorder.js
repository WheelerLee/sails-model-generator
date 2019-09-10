/**
 * 课程订单表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    student_id: {  // student_id 
      model: "tuex_member"
    },
    teacher_id: {  // teacher_id 
      model: "tuex_member"
    },
    course_id: {  // course_id 
      model: "tuex_course"
    },
    order_code: {  // 订单编号 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    house_number: {  //房号
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    street_name: {  //街道
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    province: {  //省份
     model:'province'
    },
    city: {  //市
      model:'city'
    },
    mobile: {  // 联系电话 
      type: 'string',
      maxLength: 20,
      allowNull: true,
      columnType: 'varchar(20)'
    },
    name: {  // 联系人姓名 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    total_money: {  // 订单总金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    coupon_money: {  // 优惠券抵用金额 
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo: 0
    },
    coupon_id: {  // 优惠券编号 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    pay_money: {  // 实付金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    course_name: {  // 课程名称 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    course_grade: {  // 课程年级
      model: "Xt_dict"
    },
    course_subject: { //课程学科
      model: "Xt_dict"
    },
    course_count: {  // 课程数量 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    status: {  // 订单状态（DICT） 
      model: "Xt_dict"
    },
    cancel_desc: {  // 取消订单原因 
      type: 'string',
      maxLength: 300,
      allowNull: true,
      columnType: 'varchar(300)'
    },
    canceltime: {  // 取消订单时间 
      type: 'number',
      allowNull: true,
      columnType: 'bigint(20)'
    },
    refuse_desc:{
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    cancel_type: {  // 取消类别 0：学生取消 1：教师取消
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
    },
    paytime: {  // 付款时间 
      type: 'number',
      allowNull: true,
      columnType: 'bigint(20)'
    },
  }

};

