/**
 * 广告表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pic: {  // pic 
      type: 'string',
      maxLength: 200,
      allowNull: true,
      columnType: 'varchar(200)'
    },
    name: {  // name 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    type: {  // type    DICT:BANNER_TYPE
      model: 'Xt_dict'
    },
    link: {  // link 
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    state: {  // state  0：前台不显示 1：前台显示
      type: 'number',
      allowNull: true,
      columnType: 'int(11)',
      defaultsTo: 0
    },
    linktype: { //链接类型
      model: 'Xt_dict'
    }
  }

};

