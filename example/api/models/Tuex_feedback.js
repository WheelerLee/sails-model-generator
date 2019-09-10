/**
* 用户反馈表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    member_id: {  // 反馈人编号
      model:"tuex_member"
    },
    feed_type: {  // 反馈人类型  teacher | student | guardian
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    feed_app: {  // 反馈APP问题 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    feed_course: {  // 反馈课程服务 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    content: {  // 反馈内容 
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
  }

};

