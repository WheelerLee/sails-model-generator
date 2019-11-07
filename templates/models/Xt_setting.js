/**
 * Created by WheelerLee on 2019年01月21日16:45:27.
 * Xt_setting 网站设置相关的内容
 * Copyright 2019 https://github.com/WheelerLee
 */

module.exports = {
  attributes: {
    id: {
      type: 'string',
      maxLength: 100,
      columnType: 'varchar(100)',
      unique: true,
      required: true
    },
    value: {  //设置的内容  比如：后台管理系统
      type: 'string',
      maxLength: 10000,
      columnType: 'varchar(10000)',
      allowNull: true
    },
    parent: {  //为空表示顶级内容
      model: 'Xt_setting'
    }
  }
};
