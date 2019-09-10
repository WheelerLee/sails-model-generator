/**
* 新闻表
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    author: {  // author 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    title: {  // title 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    type: {  // type 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    content: {  // content 
      type: 'string',
      allowNull: true,
      columnType: 'longtext'
    },
    picture: {  // picture 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    count: {  // count 
      type: 'number',
      allowNull: true,
      columnType: 'int(11)'
    },
    city_id: {  // city_id 
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    },
    sources: {  // sources 
      type: 'string',
      maxLength: 2000,
      allowNull: true,
      columnType: 'varchar(2000)'
    },
    time: {  // time 
      type: 'number',
      allowNull: true,

    },
    status: {  // status 
      type: 'number',
      allowNull: true,
      columnType: 'int(11)'
    },
    brief: {  // brief 
      type: 'string',
      maxLength: 500,
      allowNull: true,
      columnType: 'varchar(500)'
    },
    hits: {  // hits 
      type: 'number',
      allowNull: true,
      columnType: 'int(11)'
    },
  }

};

