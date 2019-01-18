/**
 * Xt_role_resource.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    role_id: {  //角色Id
      model: 'Xt_role'
    },
    resource_id: {  //资源Id
      model: 'Xt_resource'
    }
  }
};

