/**
* 问题回复评论记录
*
* @description :: TODO: 保存踩和赞的记录.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },
    answer_id: {  // 回答编号 
      model:"tuex_answer"
    },
    type: {  // 评论类型 ////0：赞 1：踩
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
  }

};

