var uuid = require("uuid");
module.exports = {

  attributes: {

    name:{
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    code:{
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },
    parent_id:{
      type: 'string',
      maxLength: 100,
      allowNull: true,
      columnType: 'varchar(100)'
    },

  },
  afterUpdate: async function (valuesToSet, proceed) {
    if(valuesToSet.logical_delete === 1){
     await Web_values.destroy({object_id:valuesToSet.id});
    }
    proceed();
  }
};
