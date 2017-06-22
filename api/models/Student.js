/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
// var uuid = require("uuid");
module.exports = {

  attributes: {
    student_id: {
      type: "string",
      primaryKey: true,
      defaultsTo: function () {
        // return uuid.v4().replace(/-/g, "");
        return '';
      }
    },
    nick_name: {
      type: "string",
      alpha: true,
      maxLength: 200
    },
    sex: {
      type: "string",
      alphadashed: true,
      maxLength: 32
    },
    open_id: {
      type: "string",
      alphanumericdashed: true,
      maxLength: 200
    },
    wechat_num: {
      type: "string",
      creditcard: true,
      maxLength: 200
    },
    icon_path: {
      type: "string",
      email: true,
      maxLength: 200
    },
    country: {
      type: "string",
      uppercase: true,
      maxLength: 200
    },
    city: {
      type: "string",
      maxLength: 200
    },
    language: {
      type: "string",
      minLength: 0,
      maxLength: 200
    },
    subscribe: {
      type: "string",
      regex: /^[a-zA-Z]+$/,
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
      type: "integer",
      min: 0,
      max: 10
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

