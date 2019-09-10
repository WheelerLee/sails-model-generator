/**
* 教师关注表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    student_id: {  // student_id 
      model:"tuex_member"
    },
    teacher_id: {  // teacher_id 
      model:"tuex_member"
    },
  }

};

