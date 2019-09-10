/**
 * Created by WheelerLee.
 * admin/CityController
 * Copyright 2018 https://github.com/WheelerLee
 */

module.exports = {

  index: async function (req, res) {
    if (req.method.toLowerCase() === 'get') {
      var modify_permission = await PermissionService.valid(req.session.admin.id, '/admin/City/modify');
      var delete_permission = await PermissionService.valid(req.session.admin.id, '/admin/City/delete');
      return res.view({layout: 'admin/layout', modify_permission: modify_permission, delete_permission: delete_permission});
    } else {
      try {
        var page = parseInt(req.param('page', 1));
        var limit = parseInt(req.param('limit', 10));
        var obj = {};
        if (req.param('city_name') && req.param('city_name').trim() !== '') {
          obj['city_name'] = {contains: req.param('city_name').trim()};
        }
        if (req.param('en_name') && req.param('en_name').trim() !== '') {
          obj['en_name'] = {contains: req.param('en_name').trim()};
        }
        if (req.param('ranking') && req.param('ranking').trim() !== '') {
          obj['ranking'] = req.param('ranking').trim();
        }
        if (req.param('lat') && req.param('lat').trim() !== '') {
          obj['lat'] = {contains: req.param('lat').trim()};
        }
        if (req.param('lng') && req.param('lng').trim() !== '') {
          obj['lng'] = {contains: req.param('lng').trim()};
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

        let data = await City.find({
          where: obj,
          limit: limit,
          skip: (page - 1) * limit,
          sort: 'sorted_num desc'
        });
        var count = await City.count(obj);
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
      let city = {};
      if (id) {
        city = await City.findOne({id: id});
      }
      return res.view({layout: 'admin/layout', city: city});
    } else {
      var id = req.param('id');
      var obj = req.body || {};

      try {
        let result;
        if (id) {
          result = await City.update({id: id}, obj);
        } else {
          obj.create_user = req.session.admin.id;
          result = await City.create(obj);
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
      var result = await City.update({id: id}, {deleted: 1});
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
