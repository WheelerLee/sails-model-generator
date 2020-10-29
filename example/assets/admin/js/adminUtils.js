/**
 * some function for admin template
 */
layui.define(['jquery'], function(exports) {
  var MOD_NAME = 'adminUtils';
  var $ = layui.jquery;
  var layer = layui.layer;

  function interceptCallback(callback, args) {
    return function() {
      return callback.apply(null, args);
    }
  }

  var obj = {
    /**
     * 搜索功能，自动刷新表格
     * @param {*} tableRender 表格render实例
     * @param {*} page 跳转到第几页
     */
    search: function(tableRender, page) {
      var obj = {};
      var array = $('#searchForm').serializeArray();
      for (var i = 0; i < array.length; i++) {
        var item = array[i];
        obj[item.name] = item.value;
      }
      tableRender.reload({
        where: obj,
        page: {
          curr: page
        }
      });
    },
    /**
     * 发起网络请求，该方法会自动弹出加载框以及弹出错误信息
     * @param {*} obj 
     */
    fetch: function(obj) {
      var loading = layer.load(1);
      var params = {
        type: 'POST',
        contentType: "application/json",
      };
      Object.assign(params, obj);
      if (params.data) {
        params.data = JSON.stringify(params.data);
      }
      params.success = function(data) {
        layer.close(loading);
        if (data.code === 0) {
          layer.msg(data.msg, {
            icon: 6,
            time: 2000
          }, function() {
            obj.success && obj.success(data);
          });
        } else {
          layer.msg(data.msg, {icon: 5}, function() {
            obj.error && obj.error(data);
          });
        }
      };
      params.error = function() {
        layer.close(loading);
        layer.msg('网络异常，请重试', {icon: 5}, function() {
          obj.error && obj.error();
        });
      }
      $.ajax(params);
    },
    /**
     * 绑定点击事件
     */
    bindClick: function(selector, cb, params) {
      $(selector).on('click', interceptCallback(cb, params));
    }
  };
  exports(MOD_NAME, obj);
});