var uuid = require("uuid");

module.exports = {

  attributes: {
    data_type:{
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    props_id:{
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    object_id:{
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },

    values_text:{
      type: 'string',
      allowNull: true,
      columnType: 'text'
    },
  }
}
