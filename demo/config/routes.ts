/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

export const routes = {
  // 文件相关
  '/static/upload': 'StaticController.upload',
  '/static/small/:id': 'StaticController.small',
  '/static/middle/:id': 'StaticController.middle',
  '/static/large/:id': 'StaticController.large',
  '/static/:id': 'StaticController.download'
};
