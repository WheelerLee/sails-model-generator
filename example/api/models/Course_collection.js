/**
* 课程收藏表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    member_id: {  // student_id 
     model:"tuex_member"
    },
    course_id: {  // course_id 
      model:"tuex_course"
    },
  }

};

