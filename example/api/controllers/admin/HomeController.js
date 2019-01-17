/**
 * HomeController
 * Created by WheelerLee on 2018-05-08 14:51.
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: async function (req, res) {
    let resources = await Xt_resource.getPageByUserId(req.session.admin.id);
    let user = await Xt_user.findOne({id: req.session.admin.id});
    res.view({layout: 'admin/layout', resources: resources, user: user});
  },

  splash: function (req, res) {
    res.send('首页');
  }

};

