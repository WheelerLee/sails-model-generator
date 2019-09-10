/**
 * Created by WheelerLee.
 * admin/Tuex_teacherController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_teacher/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/Tuex_teacher/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('identity_pic') && req.param('identity_pic').trim() !== '') {
          obj['identity_pic'] = {contains: req.param('identity_pic').trim()};
        }
        if (req.param('education_pic') && req.param('education_pic').trim() !== '') {
          obj['education_pic'] = {contains: req.param('education_pic').trim()};
        }
        if (req.param('intelligence_pic') && req.param('intelligence_pic').trim() !== '') {
          obj['intelligence_pic'] = {contains: req.param('intelligence_pic').trim()};
        }
        if (req.param('audit_desc') && req.param('audit_desc').trim() !== '') {
          obj['audit_desc'] = {contains: req.param('audit_desc').trim()};
        }
        if (req.param('identity_code') && req.param('identity_code').trim() !== '') {
          obj['identity_code'] = {contains: req.param('identity_code').trim()};
        }
        if (req.param('info') && req.param('info').trim() !== '') {
          obj['info'] = {contains: req.param('info').trim()};
        }
        if (req.param('score') && req.param('score').trim() !== '') {
          obj['score'] = req.param('score').trim();
        }
        if (req.param('is_comment') && req.param('is_comment').trim() !== '') {
          obj['is_comment'] = req.param('is_comment').trim();
        }
        if (req.param('id') && req.param('id').trim() !== '') {
          obj['id'] = req.param('id').trim();
        }
        if (req.param('deleted') && req.param('deleted').trim() !== '') {
          obj['deleted'] = req.param('deleted').trim();
        }
        if (req.param('create_user') && req.param('create_user').trim() !== '') {
          obj['create_user'] = {contains: req.param('create_user').trim()};
        }
        if (req.param('sorted_num') && req.param('sorted_num').trim() !== '') {
          obj['sorted_num'] = req.param('sorted_num').trim();
        }

        let data = await Tuex_teacher.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await Tuex_teacher.count(obj);
        res.json({
          code: 0,
          msg: '',
          count: count,
          data: data
        });
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
      let tuex_teacher = {};
      if (id) {
        tuex_teacher = await Tuex_teacher.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', tuex_teacher: tuex_teacher});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await Tuex_teacher.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await Tuex_teacher.create(obj);
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
      var result = await Tuex_teacher.update({id: id}, {deleted: 1});
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
