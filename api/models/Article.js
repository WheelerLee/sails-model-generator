/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

// var uuid = require("uuid");
module.exports = {
  name: '文章',
  attributes: {
    article_id: {
      type: "string",
      size: 32,
      primaryKey: true,
      // defaultsTo: function () {
      //   return uuid.v4().replace(/-/g, "");
      // }
    },
    title: {
      type: 'string',
      size: 255,
      maxLength: 255,
      notNull: true,
      name: '标题'
    },
    content: {
      type: 'text',
      notNull: true,
      name: '内容'
    },
    type: {
      type: 'integer',
      min: 0,
      max: 10,
      required: true
    }
  }
};

