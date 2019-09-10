/**
 * Created by WheelerLee.
 * admin/NewsController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/News/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/News/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('author') && req.param('author').trim() !== '') {
          obj['author'] = {contains: req.param('author').trim()};
        }
        if (req.param('title') && req.param('title').trim() !== '') {
          obj['title'] = {contains: req.param('title').trim()};
        }
        if (req.param('type') && req.param('type').trim() !== '') {
          obj['type'] = {contains: req.param('type').trim()};
        }
        if (req.param('content') && req.param('content').trim() !== '') {
          obj['content'] = {contains: req.param('content').trim()};
        }
        if (req.param('picture') && req.param('picture').trim() !== '') {
          obj['picture'] = {contains: req.param('picture').trim()};
        }
        if (req.param('count') && req.param('count').trim() !== '') {
          obj['count'] = req.param('count').trim();
        }
        if (req.param('city_id') && req.param('city_id').trim() !== '') {
          obj['city_id'] = {contains: req.param('city_id').trim()};
        }
        if (req.param('sources') && req.param('sources').trim() !== '') {
          obj['sources'] = {contains: req.param('sources').trim()};
        }
        if (req.param('time') && req.param('time').trim() !== '') {
          obj['time'] = req.param('time').trim();
        }
        if (req.param('status') && req.param('status').trim() !== '') {
          obj['status'] = req.param('status').trim();
        }
        if (req.param('brief') && req.param('brief').trim() !== '') {
          obj['brief'] = {contains: req.param('brief').trim()};
        }
        if (req.param('hits') && req.param('hits').trim() !== '') {
          obj['hits'] = req.param('hits').trim();
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

        let data = await News.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await News.count(obj);
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
      let news = {};
      if (id) {
        news = await News.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', news: news});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await News.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await News.create(obj);
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
      var result = await News.update({id: id}, {deleted: 1});
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
