/**
 * 教师生源表
 * @type {{student_id: {model: string}, teacher_id: {model: string}}}
 */

module.exports = {
  attributes: {
    student_id: {
      model: "tuex_member"
    },
    teacher_id: {
      model: "tuex_member"
    }
  }
}
