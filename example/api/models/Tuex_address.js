/**
 * 用户地址表
 *
 * @description :: TODO: .
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    member_id:{
      model:'Tuex_member'
    },
    province_id: {  // 省份
      model: 'Province'
    },
    city_id: {  // 城市
      model: "city"
    },
    street_name: {
      type: 'string',
      maxLength: 250,
      allowNull: true,
      columnType: 'varchar(250)'
    },
    house_number: {
      type: 'string',
      maxLength: 250,
      allowNull: true,
      columnType: 'varchar(250)'
    }
  }

};

