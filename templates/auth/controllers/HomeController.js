/**
 * Admin/HomeController
 *
 * @description :: Server-side logic for managing admin/homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports = {

	index: async(function (req, res) {

    var id = req.session.admin.id;
	  var getParent = function (resources, id) {
      for (var i in resources) {
        var resource = resources[i];
        if (resource.id === id) {
          return resource;
        }
      }
      return null;
    };
    var down_path = sails.config.file_server.down_path;
    var upload_path = sails.config.file_server.upload_path;
	  var userInfo = await(Xt_user.findOne({where:{id:id}}));
    Xt_resources.query('select xt_resources.* from xt_resources LEFT JOIN xt_role_resources on ' +
      'xt_resources.id=xt_role_resources.resources_id LEFT JOIN xt_user_role on ' +
      'xt_role_resources.role_id=xt_user_role.role_id where xt_user_role.user_id=? ' +
      'and xt_resources.res_type_code=? order by xt_resources.parent_id,sorted_num asc', [id, 'page_type'], function (err, results) {

      if (err) res.serverError(err);

      var resources = [];
      for (var i in results) {

        var resource = results[i];
        if (resource.parent_id === '-1') {
          resources.push(resource);
        } else {
          var parent = getParent(resources, resource.parent_id);
          if (!parent) break;
          if (!parent.sub_resources) parent.sub_resources = [];
          parent.sub_resources.push(resource);
        }

      }
      res.view({layout: 'admin/layout', resources: resources,userInfo:userInfo,down_path:down_path,upload_path:upload_path});

    });


  }),

  welcome: function (req, res) {
    res.view({layout: 'admin/layout'});
  },

  userInfo:async(function (req,res) {
    var id = req.session.admin.id;
    var head_icon = req.param('head_icon', '');
    if (req.method === "POST") {
      if (id) {
        var user = Xt_user.findOne({where: {id: id}});
        if (user) {
          var result = await(Xt_user.update({id: id}, {head_icon: head_icon}));
          res.json({
            errCode: 0,
            msg: '修改成功',
            data: result
          })
        }
      } else {
        res.json({
          errCode: 1,
          msg: '用户验证失败，请重新登录！'
        })
      }
    }

  })
};

