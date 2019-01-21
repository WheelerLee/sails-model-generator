/**
 * Attach.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    real_name: {
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)',
      allowNull: true
    },
    save_name: {   //原始图
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)'
    },
    large_name: {    //大图 最大1024*1024
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)',
      allowNull: true
    },
    middle_name: {   //中图 最大512*512
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)',
      allowNull: true
    },
    small_name: {    //小图 最大256*256
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)',
      allowNull: true
    },
    save_path: {
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)'
    },
    status: {
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)',
      allowNull: true
    },
    file_type: {
      type: 'string',
      maxLength: 255,
      columnType: 'VARCHAR(255)',
      allowNull: true
    },
    attach_size: {
      type: 'number',
      columnType: 'integer',
      defaultsTo: 0
    },

  },

};

