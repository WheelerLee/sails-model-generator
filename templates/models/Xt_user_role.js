/**
 * Xt_user_role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    role_id: {    //角色ID
      model: 'Xt_role'
    },
    user_id: {    //用户Id
      model: 'Xt_user'
    }
  }
};

