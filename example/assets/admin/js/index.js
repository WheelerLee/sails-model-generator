/**
 * Created by WheelerLee on 2018-05-08 17:12.
 * index
 * Copyright 2017 https://github.com/WheelerLee
 */

var jquery;
var element;

/**
 * 添加标签页
 * @param obj
 */
function addTab(obj) {
  var $ = jquery;
  if ($("#LAY_app_tabsheader li[lay-id='" + obj.href + "']").length === 0) {  //不存在则添加一个新的标签
    element.tabAdd('layadmin-layout-tabs', {
      title: obj.title,
      id: obj.href
    });
    var body_str = '<div class="layadmin-tabsbody-item">' +
      '<iframe src="' + obj.href + '" frameborder="0" class="layadmin-iframe">' +
      '</iframe></div>';
    $('.layadmin-tabsbody-item').removeClass('layui-show');
    $('#LAY_app_body').append(body_str);
  }
  element.tabChange('layadmin-layout-tabs', obj.href);
}

layui.use(['element', 'layer'], function () {

  element = layui.element;
  var $ = layui.jquery;
  jquery = $;

  $('body').addClass('layui-layout-body');

  element.on('tab(layadmin-layout-tabs)', function (obj) {
    $('#LAY_app_body .layui-show').removeClass('layui-show');
    $("#LAY_app_body .layadmin-tabsbody-item:eq(" + obj.index + ")").addClass('layui-show');
  });

  element.on('tabDelete(layadmin-layout-tabs)', function (data) {
    $('#LAY_app_body .layadmin-tabsbody-item:eq(' + data.index + ')').remove();
  });

  //监听导航点击
  element.on('nav(layadmin-system-side-menu)', function (elem) {
    // console.log(elem[0]);
    // console.log(elem.attr('lay-href'));
    var lay_href = elem.attr('lay-href');
    if (lay_href) {
      addTab({
        href: lay_href,
        title: elem.html()
      });
    }
  });

  window.onresize = function () {
    $('#LAY_app').removeClass('layadmin-side-spread-sm');
    $('#LAY_app').removeClass('layadmin-side-shrink');
    if (document.body.clientWidth >= 992) {
      // layui-icon-spread-left
      // layui-icon-shrink-right
      $('#LAY_app_flexible').removeClass('layui-icon-spread-left');
      $('#LAY_app_flexible').addClass('layui-icon-shrink-right');
    } else {
      $('#LAY_app_flexible').removeClass('layui-icon-shrink-right');
      $('#LAY_app_flexible').addClass('layui-icon-spread-left');
    }
  };
  $('#flexible').on('click', function () {
    if (document.body.clientWidth >= 992) {
      $('#LAY_app').toggleClass('layadmin-side-shrink');
      if ($('#LAY_app').hasClass('layadmin-side-shrink')) {
        $('#LAY_app_flexible').removeClass('layui-icon-shrink-right');
        $('#LAY_app_flexible').addClass('layui-icon-spread-left');
      } else {
        $('#LAY_app_flexible').removeClass('layui-icon-spread-left');
        $('#LAY_app_flexible').addClass('layui-icon-shrink-right');
      }
    } else {
      $('#LAY_app').toggleClass('layadmin-side-spread-sm');
      if ($('#LAY_app').hasClass('layadmin-side-spread-sm')) {
        $('#LAY_app_flexible').removeClass('layui-icon-spread-left');
        $('#LAY_app_flexible').addClass('layui-icon-shrink-right');
      } else {
        $('#LAY_app_flexible').removeClass('layui-icon-shrink-right');
        $('#LAY_app_flexible').addClass('layui-icon-spread-left');
      }
    }
  });
  $('.layadmin-body-shade').on('click', function () {
    $('#LAY_app').removeClass('layadmin-side-spread-sm');
    $('#LAY_app_flexible').removeClass('layui-icon-shrink-right');
    $('#LAY_app_flexible').addClass('layui-icon-spread-left');
  });
  $('#btn_info').on('click', function () {
    addTab({
      href: '../user/info',
      title: '基本资料'
    });
  });
  $('#btn_change_pwd').on('click', function () {
    addTab({
      href: '../user/change_pwd',
      title: '修改密码'
    });
  });
  $('#LAY_close_current_btn').on('click', function () {
    var index = $('#LAY_app_tabsheader li').toArray().indexOf($('#LAY_app_tabsheader .layui-this').get(0));
    if (index !== 0) {
      $('#LAY_app_tabsheader .layui-this .layui-tab-close').click();
    }
  });
  $('#LAY_close_others_btn').on('click', function () {
    var index = $('#LAY_app_tabsheader li').toArray().indexOf($('#LAY_app_tabsheader .layui-this').get(0));
    $('#LAY_app_tabsheader li').each(function (i) {
      if (i !== 0 && i !== index) {
        $(this).find('.layui-tab-close').click();
      }
    });
  });
  $('#LAY_close_all_btn').on('click', function () {
    $('#LAY_app_tabsheader li').each(function (i) {
      if (i !== 0) {
        $(this).find('.layui-tab-close').click();
      }
    });
  });
  $('#LAY_btn_refresh').on('click', function () {
    $('#LAY_app_body .layui-show iframe').attr('src', $('#LAY_app_body .layui-show iframe').attr('src'));
  });

});

