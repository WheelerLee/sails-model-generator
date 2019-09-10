/**
* 教师和课程评论表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    student_id: {  // student_id 
      model:"tuex_member"
    },
    order_item_id: {  // 订单消息编号
      model:"tuex_courseorderitem"
    },
    course_id:{
      model:"tuex_course"
    },
    type: {  // 评论类型 0：课程评论
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    type_id: {  // 评论类型编号 ?
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    score: {  // 评分 
      type: 'number',
      allowNull: true,
      columnType: 'float'
    },
    content: {  // 内容 
      type: 'string',
      maxLength: 400,
      allowNull: true,
      columnType: 'varchar(400)'
    },
    pic: {  // 图片 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    display_status: {  // 显示状态  0显示 1：隐藏
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
  }

};

