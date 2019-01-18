/**
 * Created by WheelerLee on 2018-05-09 16:38.
 * Xt_resource
 * Copyright 2017 https://github.com/WheelerLee
 */

module.exports = {
  attributes: {
    name: {  //资源名称
      type: 'string',
      maxLength: 100,
      columnType: 'varchar(100)',
      required: true
    }
  }
};
