/**
 * Created by liwei on 2017/8/27.
 */

function hasTab($, title) {
  var tabIndex = null;
  $("#top_tabs li").each(function(){
    if($(this).find("span").text() === title) {
      tabIndex = this;
    }
  });
  return tabIndex;
}

layui.use(['element', 'layer'], function() {
  var element = layui.element, $ = layui.jquery, layer = layui.layer;

  $("body").on("click", "#menu_tree.layui-nav .layui-nav-item a", function() {

    if ($(this).attr('_href')) {
      var tabIndex = hasTab($, $(this).text());
      if (tabIndex) {  //已经存在此标签
        element.tabChange('bodyTab', $(tabIndex).attr('lay-id'));
      } else {
        var id = new Date().getTime();
        element.tabAdd('bodyTab', {
          title: '<span>' + $(this).html() + '</span><i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>',
          content: '<iframe src="' + $(this).attr('_href') + '"></iframe>',
          id: id
        });
        element.tabChange('bodyTab', id);
      }
    }
  });

  $('body').on('click', '#top_tabs .layui-tab-close', function () {
    element.tabDelete('bodyTab', $(this).parent('li').attr('lay-id'));
  });

  $('body').on('click', '.refreshThis', function () {
    $('#top_tabs_box .layui-tab-item.layui-show iframe')
      .attr('src', $('#top_tabs_box .layui-tab-item.layui-show iframe').attr('src'));
  });

  $('body').on('click', '.closePageAll', function () {
    $("#top_tabs li").each(function(i) {
      // alert(i);
      if(i !== 0) {
        element.tabDelete('bodyTab', $(this).attr('lay-id'));
      }
    });

  });

  $('body').on('click', '.closePageOther', function (e) {
    $("#top_tabs li").each(function(i) {
      if(i !== 0 && !$(this).hasClass('layui-this')) {
        element.tabDelete('bodyTab', $(this).attr('lay-id'));
      }
      $(this).parent('dd').removeClass('layui-this');
    });

  });

  $("body").on("click", "#change_pwd_btn", function() {

    layer.open({
      type: 2,
      title: '修改密码',
      maxmin: true,
      resize: false,
      area: ['485px', '300px'],
      content: '/admin/user/change_pwd',
      zIndex: layer.zIndex, //重点1
      // success: function(layero) {
      //   // layer.setTop(layero); //重点2
      // }
    });

  });

  $("body").on("click", "#info", function() {

    layer.open({
      type: 2,
      title: '个人信息',
      maxmin: true,
      resize: false,
      area: ['60%', '60%'],
      content: '/admin/user/info',
      zIndex: layer.zIndex, //重点1
      // success: function(layero) {
      //   // layer.setTop(layero); //重点2
      // }
    });

  });

  element.on('nav(caozuo)', function(elem) {

    setTimeout(function (args) {
      $(elem[0]).removeClass('layui-this');
    }, 500);

  });

});
