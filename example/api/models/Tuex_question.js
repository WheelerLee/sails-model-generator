/**
 * 问题表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    student_id: {  // 提问人 ////项目内就是student
      model: "tuex_member"
    },
    title: {  // 标题 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    pics: { //问题图片 ，多图使用“,"英文逗号分割
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    content: {  // 具体内容 
      type: 'string',
      allowNull: true,
      columnType: 'text'
    },
    hot: {   //热度
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    label: {  // 问题标签 ////通过标签来快速定位问题类型（可以为学科）
      model: "xt_dict"
    },
    status: {  // 状态 0 正常 1 禁用 暂不使用
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    days: {  // 悬赏期限 单位是h
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    amount: {  // 悬赏金额 
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    type: {  // 悬赏类型 ////0：无赏金  2：有赏金
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    answer: {  // 正确答案 ////关联答案表
      model: 'tuex_answer'
    },
    have_answer: {  // 是否有正确答案 0没有 1有或过期
      type: 'number',
      allowNull: true,
      columnType: 'int',
      defaultsTo: 0
    },
    is_select: {  // 是否手动选择 ////0：手动  1：自动选择
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    select_time: {  // 选择答案时间 
      type: 'number',
      allowNull: true,

    },
    end_time: {  // 答题结束时间 
      type: 'number',
      allowNull: true,

    },
  }

};

