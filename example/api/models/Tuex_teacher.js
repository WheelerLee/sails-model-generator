/**
 * 教师表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    identity_pic: {  // 身份照片 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    education_pic: {  // 学历证照片 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    intelligence_pic: {  // 资质证照片 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    audit_desc: {  // 审核理由 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    identity_code: { //身份证号
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    info: { //教师信息描述
      type: 'string',
      allowNull: true,
      columnType: 'text'
    },
    score: {  // 评分 
      type: 'number',
      allowNull: true,
      columnType: 'float'
    },
    is_comment: {  // 推荐 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    course_grade: {  // 授课年级(DICT) 
      model: "Xt_dict"
    },
    course_subject: {  // 授课学科(DICT) 
      model: "Xt_dict"
    },
  }

};

