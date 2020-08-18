/**
 * Created by WheelerLee.
 * admin/Xt_resourceController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    // if (req.method.toLowerCase() === 'get') {
    if (req.param('x') !== 'y') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_resource/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_resource/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        // let data = await Xt_resource.getAllResources();
        // let sql = 'select * from xt_resource where deleted = 0 order by xt_resource.sorted_num asc';
        // let resources = (await sails.sendNativeQuery(sql, [])).rows;
        let resources = await Xt_resource.find({
          where: {
            deleted: 0
          },
          sort: 'sorted_num asc'
        }).populate('res_type_code');
        for (let r of resources) {
          if (!r.parent_id) r.parent_id = 0;
        }
        res.json({
          code: 0,
          msg: '',
          data: resources
        });
      } catch (e) {
        console.log(e);
        res.json({
          code: 1,
          msg: '获取失败'
        });
      }
    }
  },

  modify: async function (req, res) {

    var id = req.param('id');
    if (req.method.toLowerCase() === 'get') {
      var parent_id = req.param('parent_id');
      let xt_resource = {};
      let parent = {};
      if (id) {
        xt_resource = await Xt_resource.findOne({id: id});
      }
      if (parent_id) {
        parent = await Xt_resource.findOne({id: parent_id});
      }
      let types = await Xt_dict.find({
        parent_id: 'resource_type'
      });
      let resources = await Xt_resource.find({
        parent_id: null,
        deleted: 0
      });
      return res.view({layout: 'admin/layout', xt_resource: xt_resource, types: types, resources: resources, parent: parent});
    } else {
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Xt_resource.update({id: id}, obj);
        } else {
          result = await Xt_resource.create(obj);
        }

        res.json({
          errCode: 0,
          msg: id ? '修改成功' : '添加成功',
          data: result
        });
      } catch (e) {
        console.log(e);
        res.json({
          errCode: 1,
          msg: '服务异常，请重试'
        });
      }
    }

  },

  delete: async function (req, res) {
    try {
      var id = req.param('id');
      var result = await Xt_resource.update({id: id}, {deleted: 1}).fetch();
      res.json({
        errCode: 0,
        msg: '删除成功',
        data: result
      });
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '删除失败，请重试!'
      });
    }
  }

};
