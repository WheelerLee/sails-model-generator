/**
* 课程订单详细表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    order_id: {  // order_id
      model:"tuex_courseorder"
    },
    course_id: {  // course_id
      model:"tuex_course"
    },
    student_id: {  // student_id
      model:"tuex_member"
    },
    teacher_id: {  // teacher_id
      model:"tuex_member"
    },
    price: {  // 课程价格
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
    course_date: {  // 上课日期
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    start_time: {  // 上课開始时间
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    end_time:{ // 上課結束時間
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    times: {  //所有用的时间段索引合集，用,隔开。eg:  1,2,3,4
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    status: {  // 状态 0:未支付/待完成 1：课程结束 , 2：已取消 3:退款中 4: 上课中 5: 已支付，6：拒绝退款
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo: 0
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
      columnType: 'int(11)'
    },
    cancel_type: {  // 取消类别 0：学生取消 1：教师取消
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
    },
    refuse_desc:{
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    start_class_time: {  // 开始上课时间戳
      type: 'number',
      allowNull: true,
      columnType: 'bigint(20)'
    },
    end_class_time: {  // 结束课程时间戳
      type: 'number',
      allowNull: true,
      columnType: 'bigint(20)'
    }
  }

};

