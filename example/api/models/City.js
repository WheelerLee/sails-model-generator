/**
* 城市
*
* @description :: TODO: .
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {
    city_name: {  // city_name 
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
    province_id: {  // province_id 
      model:"province"
    },
    ranking: {  // ranking 
      type: 'number',
      allowNull: true,
      columnType: 'int(11)'
    },
    lat: {  // en_name 
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    },
    lng: {  // en_name 
      type: 'string',
      maxLength: 255,
      allowNull: true,
      columnType: 'varchar(255)'
    }
  }

};

