/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': {
    view: 'pages/homepage'
  },
  
  '/admin': '/admin/home/index',

  //文件相关
  '/api/static/upload': 'StaticController.upload',
  '/static/upload': 'StaticController.upload',
  '/static/small/:id': 'StaticController.download_small',
  '/static/middle/:id': 'StaticController.download_middle',
  '/static/large/:id': 'StaticController.download_large',
  '/static/:id': 'StaticController.download'


};
