/**
 * HomeController
 * Created by WheelerLee on 2018-05-08 14:51.
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: async function (req, res) {
    let resources = await Xt_resource.getPageByUserId(req.session.admin.id);

    const yy = function(r) {
      if (r.sub_resources && r.sub_resources.length > 0) {
        return `
                <a href="javascript:;">${r.name}</a>
                ${xx(r.sub_resources)}
              `;
      } else {
        return `<a lay-href="${r.path}">${r.icon_path ? '<i class="layui-icon">' + r.icon_path + '</i>' : ''}${r.name}</a>`;
      }
    };

    const xx = function(sub_resources) {
      if (sub_resources && sub_resources.length > 0) {
        let x = '<dl class="layui-nav-child">';
        for (let r of sub_resources) {
          x += `
            <dd data-name="console" class="">
            ${yy(r)}
            </dd>
          `;
        }
        x += '</dl>';
        return x;
      } else {
        return '';
      }
    };

    let nav = '';
    for (let r of resources) {
      nav += `
        <li class="layui-nav-item">
        <a href="javascript:;" lay-tips="${r.name}" lay-direction="2">
        <i class="layui-icon">${r.icon_path ? r.icon_path : ''}</i>
        <cite>${r.name}</cite>
        <span class="layui-nav-more"></span>
        </a>
        ${xx(r.sub_resources)}
        </li>
        `;
    }

    let user = await Xt_user.findOne({id: req.session.admin.id});
    res.view({layout: 'admin/layout', resources: resources, user: user, nav: nav});
  },

  splash: function (req, res) {
    res.send('首页');
  }

};

