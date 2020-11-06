/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

export const policies = {

  /** *************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ************************************************************************** */

  '*': ['adminSession', 'adminPermisssion'],
  'sys/user/*': ['adminSession'],
  'sys/home/*': ['adminSession'],
  'sys/user/login': true,
  'static/*': true,

};
