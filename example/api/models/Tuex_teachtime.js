/**
 * 教师上课时间表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    teacher_id: {  // teacher_id
      model: "tuex_member"
    },
    course_day: {  // 上课时间（【周日-0,一-1，二-2，三，四，五，六】）
      type: 'number',
      allowNull: true,
    },
    start_time: {  // 結束時間
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    end_time: {  // 開始時間
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    course_date: { // 上课日期 （设定唯一上课日期时使用）直接保存成 2018-09-09
      type: "string",
      allowNull: true,
      maxLength: 100,
      columnType: 'varchar(100)'
    },
    once: {  //单次上课 0：否 1：是 ，设定唯一上课时间时为1,
      type: "number",
      allowNull: false,
      defaultsTo: 0
    }
  }

};

