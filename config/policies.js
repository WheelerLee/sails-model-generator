/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  'admin/UserController': {
    '*': ['adminSessionAuth'],
    'login': true
  },
  'admin/HomeController': {
    '*': ['adminSessionAuth']
  },
  'admin/Xt_userController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_dictController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_resourceController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/Xt_roleController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },
  'admin/MemberController': {
    '*': ['adminSessionAuth', 'permissionsAuth']
  },

};