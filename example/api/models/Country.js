/**
* 国家
*
* @description :: TODO: 国家.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    code: {  // code 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    all_name: {  // all_name 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    name: {  // name 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    type: {  // type 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    area_code: {  // area_code 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    dns_name: {  // dns_name 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    time_diff: {  // time_diff 
      type: 'string',
      maxLength: 32,
      allowNull: true,
      columnType: 'varchar(32)'
    },
    children:{
      collection:'Province',
      via:"country_id"
    }
  }

};

