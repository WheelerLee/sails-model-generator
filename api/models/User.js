/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
// var uuid = require("uuid");
module.exports = {

  attributes: {
    id: {
      type: "string",
      primaryKey: true,
      defaultsTo: function () {
        // return uuid.v4().replace(/-/g, "");
        return '';
      }
    },
    nick_name: {
      type: "string",
      maxLength: 200
    },
    sex: {
      type: "string",
      maxLength: 32
    },
    open_id: {
      type: "string",
      maxLength: 200
    },
    wechat_num: {
      type: "string",
      maxLength: 200
    },
    icon_path: {
      type: "string",
      maxLength: 200
    },
    country: {
      type: "string",
      maxLength: 200
    },
    city: {
      type: "string",
      maxLength: 200
    },
    language: {
      type: "string",
      maxLength: 200
    },
    subscribe: {
      type: "string",
      maxLength: 32
    },
    subscribe_time: {
      type: "datetime"
    },
    balance: {
      type: "float"
    },
    phone: {
      type: "string",
      maxLength: 32
    },
    state: {
      type: "integer"
    },
    charm_val: {
      type: "integer"
    },
    login_name: {
      type: "string",
      maxLength: 50
    },
    password: {
      type: "string",
      maxLength: 50
    }
  }
};

