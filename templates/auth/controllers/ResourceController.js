/**
 * Admin/ResourceController
 *
 * @description :: Server-side logic for managing Admin/resources
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports = {

  /**
   * 添加页面
   * @param req
   * @param res
   */
  input: async(function (req, res) {
    try {
      if (req.method == "GET") {
        var obj = {};
        var id = req.param("id", '');
        obj.parent_id = "";
        var resource = {};
        if (!!id && id != '')
          resource = await(Xt_resources.findOne({where: {id: id}}));
        var parents = await(Xt_resources.find({or: [{parent_id: '-1'}, {parent_id: null}]}));
        res.view({
          layout: 'admin/layout',
          resource_type: [{name: "资源页面", value: "page_type"},{name: "操作按钮", value: "btn_type"}],
          parents: parents.reverse(),
          resource: resource
        });
      }
      else if (req.method == "POST") {
        var id = req.param('id', '');
        var name = req.param('name', '');
        var alias_name = req.param('alias_name', '');
        var res_type_code = req.param('res_type_code', '');
        var icon_path = req.param('icon_path', '');
        var path = req.param('path', '');
        var description = req.param('description', '');
        var sorted_num = req.param('sorted_num', '');
        var create_user = req.session.admin.id;
        var parent_id = req.param('parent_id', '');
        if (parent_id === '-1' || parent_id.length === 32 || !parent_id) {
          var obj_ = {
            name: name,
            alias_name: alias_name,
            res_type_code: res_type_code,
            icon_path: icon_path,
            path: path,
            description: description,
            sorted_num: sorted_num,
            create_user: create_user,
            parent_id: parent_id
          }
          if (id && id != '' && id != null) {//编辑
            obj_.id = id;
            var result = await(Xt_resources.update({id: id},obj_));
            res.json({
              errCode: 0,
              msg: '修改成功',
              result: result
            });
          }else{//添加
            var result = await(Xt_resources.create(obj_));
            res.json({
              errCode: 0,
              msg: '保存成功',
              result: result
            });
          }
        } else {
          res.json({
            errCode: 1,
            msg: '父级资源选择有误,请检查无误后重试',
            result: result
          });
        }
      }
    }catch(err) {
      res.json({
        errCode: 1,
        msg: '保存失败,请重试'
      });
    }
  }),
  /**
   * 列表页面5
   * @param req
   * @param res
   */
  index: async(function (req, res) {
    if(req.method == "GET"){
      var parents = await(Xt_resources.find({or:[{parent_id: '-1' },{parent_id: null}]}));
      res.view({layout: 'admin/layout',parents:parents});
    }
    else if(req.method == "POST"){
      var page = parseInt(req.param('page', 1));
      var limit = parseInt(req.param('limit', 30));
      var name = req.param('name', '');
      var parent_id = req.param('parent_id','');
      var obj = {};
      if (name) obj.name = name;
      if(parent_id && parent_id != '-1') obj.parent_id = parent_id;

      var roles = await(Xt_resources.find({where: obj, limit: limit, skip: (page - 1) * limit}).populate("parent_id"));
      var count = await(Xt_resources.count(obj));

      res.json({
        code: 0,
        msg: '',
        count: count,
        data: roles
      });
    }

  }),
  /**
   * 删除数据
   * @param req
   * @param res
   */
  delete: async(function (req, res) {
    try {
      var id = req.param('id', '');
      var result = await(Xt_resources.destroy({
        id: id
      }));
      res.json({
        errCode: 0,
        msg: '删除成功',
        result: result
      });
    } catch (e) {
      res.json({
        errCode: 1,
        msg: '删除失败,请重试'
      });
    }
  }),

  icon_index :function (req,res) {
    res.view({
      layout:"admin/layout"
    })
  }
  
};

