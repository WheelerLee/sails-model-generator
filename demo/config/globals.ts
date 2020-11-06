/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */

export const globals = {

  /** **************************************************************************
  *                                                                           *
  * Whether to expose the locally-installed Lodash as a global variable       *
  * (`_`), making  it accessible throughout your app.                         *
  * (See the link above for help.)                                            *
  *                                                                           *
  *************************************************************************** */

  // eslint-disable-next-line global-require
  _: require('@sailshq/lodash'),

  /** **************************************************************************
  *                                                                           *
  * Whether to expose the locally-installed `async` as a global variable      *
  * (`async`), making it accessible throughout your app.                      *
  * (See the link above for help.)                                            *
  *                                                                           *
  *************************************************************************** */

  async: false,

  /** **************************************************************************
  *                                                                           *
  * Whether to expose each of your app's models as global variables.          *
  * (See the link at the top of this file for more information.)              *
  *                                                                           *
  *************************************************************************** */

  models: false,

  /** **************************************************************************
  *                                                                           *
  * Whether to expose the Sails app instance as a global variable (`sails`),  *
  * making it accessible throughout your app.                                 *
  *                                                                           *
  *************************************************************************** */

  sails: true,

};