/**
* 评论回复表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    comments_id: {  // comments_id 
      model:"tuex_comments"
    },
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },
    content: {  // 内容 
      type: 'string',
      maxLength: 400,
      allowNull: true,
      columnType: 'varchar(400)'
    },
  }

};

