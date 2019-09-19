/**
 * Created by WheelerLee.
 * admin/Xt_dictController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.param('x') !== 'y') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_dict/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/xt_dict/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {

        let data = await Xt_dict.find({
          where: {
            deleted: 0
          },
          sort: "sorted_num asc"
        });
        for (let r of data) {
          if (!r.parent_id) r.parent_id = 0;
        }

        return res.json({
          code: 0,
          msg: '',
          data: data
        });

        let action = req.param('action');
        if (action === 'menu') {
          let data = await Xt_dict.find({
            where: {
              parent_id: null,
              deleted: 0
            },
            sort: 'sorted_num desc'
          }).populate('children', {
            where: {
              deleted: 0
            }
          });
          res.json({
            code: 0,
            msg: '',
            data: data
          });

        } else {
          let id = req.param('id');
          if (id) {
            let data = await Xt_dict.find({
              parent_id: id,
              deleted: 0
            });
            res.json({
              code: 0,
              msg: '',
              data: data
            });
          } else {
            res.json({
              code: 0,
              msg: '',
              data: []
            });
          }
        }

      } catch (e) {
        res.json({
          code: 1,
          msg: '获取失败'
        });
      }
    }
  },

  modify: async function (req, res) {

    if (req.method.toLowerCase() === 'get') {
      var id = req.param('id');
      let action = req.param('action');
      let parent_id = req.param('parent_id');
      let dict = req.param('dict');
      let xt_dict = {};
      if (id) {
        xt_dict = await Xt_dict.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', xt_dict: xt_dict, action: action, parent_id: parent_id, dict: dict});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Xt_dict.update({id: id}, obj);
        } else {
          let a = await Xt_dict.findOne({id: obj.code});
          if (a) {
            return res.json({errCode: 1, msg: '该编码已被使用'});
          }
          obj.id = obj.code;
          result = await Xt_dict.create(obj);
        }

        res.json({
          errCode: 0,
          msg: id ? '修改成功' : '添加成功',
          data: result
        });
      } catch (e) {
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
      // var result = await Xt_dict.update({id: id}, {deleted: 1});
      // res.json({
      //   errCode: 0,
      //   msg: '删除成功',
      //   data: result
      // });

      await Xt_dict.destroy({id: id});
      res.json({
        errCode: 0,
        msg: '删除成功'
      });

    } catch (e) {
      res.json({
        errCode: 1,
        msg: '删除失败，请重试!'
      });
    }
  }

};
