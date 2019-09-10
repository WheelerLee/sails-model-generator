/**
 * 教师上课城市表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    teacher: {  // 教师 ////项目内就是student
      model: "Tuex_member",
      columnName: 'teacher_id'
    },
    city: {
      model: "City",
      columnName: 'city_id'
    }
  }

};

