/**
* 课程表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },
    name: {  // 课程名称 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    main_pic: {  // 主图（可多张） 
      type: 'string',
      maxLength: 1000,
      allowNull: true,
      columnType: 'varchar(1000)'
    },
    list_pic: {  // 列表图 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    video_link: {  // 视频链接 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    little_title: {  // 小标题 
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    desc: {  // 课程介绍 
      type: 'string',
      allowNull: true,
      columnType: 'text'
    },
    type: {  // 0  线下上门  //暂时不使用 使用teacher的wiling to travel
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    times: {  // 课次  //暂时不使用 时间根据teacher设置的上课时间
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    subject: {  // 学科(DICT) 
     model:"xt_dict"
    },
    grade: {  // 适合年级 
      model:"xt_dict"
    },
    price: {  // 价格 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    status: {  // 状态(DICT) ` 0:发布中 1：已下架
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo:0
    },
  }

};

