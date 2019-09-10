/**
* 省份
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    name: {  // name 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    en_name: {  // en_name 
      type: 'string',
      maxLength: 128,
      allowNull: true,
      columnType: 'varchar(128)'
    },
    country_id: {  // country_id 
      model:"Country"
    },
    children: {
      collection: 'City',
      via: "province_id"
    }
  }

};

