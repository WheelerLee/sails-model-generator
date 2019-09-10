/**
 * Created by WheelerLee on 2018-05-08 17:12.
 * index
 * Copyright 2017 https://github.com/WheelerLee
 */

var jquery;
var element,layer;

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
  let elements = $(".layui-this");
  if(elements){
    elements[0].scrollIntoView(true);
  }
  element.tabChange('layadmin-layout-tabs', obj.href);
}

/**
 * 弹出窗口
 * @param obj
 */
function openLayer(obj) {
  layer.open({
    title: obj.title,
    type:2,
    content: obj.href,
    maxmin: true,
    resize: false,
    area: ['67%', '80%'],
    end:function () {
      if(typeof obj.end == "function"){
        obj.end();
      }
    }
  });
}

/**
 * 关闭选项卡
 * @param index
 */
function closeTab(id){
  element.tabDelete("layadmin-layout-tabs",id);
}

/**
 * 关闭当前选项卡
 * @param index
 */
function closeCurrentTab(){
  let id =jquery(".layadmin-pagetabs li.layui-this",window.top.document).attr("lay-id");
  element.tabDelete("layadmin-layout-tabs",id);
}

layui.use(['element', 'layer'], function () {

  element = layui.element;
  layer = layui.layer;
  var $ = layui.jquery;
  jquery = $;

  $('body').addClass('layui-layout-body');

  element.on('tab(layadmin-layout-tabs)', function (obj) {

    $('#LAY_app_body .layui-show').removeClass('layui-show');
    $("#LAY_app_body .layadmin-tabsbody-item:eq(" + obj.index + ")").addClass('layui-show');

    var li = $("#LAY_app_tabsheader li:eq(" + obj.index + ")");
    var tabs_width = obj.elem.width();  //整个tabbar的实际宽度
    var li_left = li.position().left;  //当前选中的tab距离左边的位置
    var tabs_scroll = obj.elem.scrollLeft();   //tabbar滚动的距离
    if (li_left < tabs_scroll) {  //显示在左边
      var left = $('#LAY_app_tabsheader').scrollLeft() - (tabs_scroll - li_left);
      $('#LAY_app_tabsheader').animate({
        scrollLeft: left
      }, 200);
    }
    if (li_left + li.outerWidth() > tabs_width + tabs_scroll) {//显示在右边
      let left = $('#LAY_app_tabsheader').scrollLeft() + li_left + li.outerWidth() - (tabs_width + tabs_scroll);
      $('#LAY_app_tabsheader').animate({
        scrollLeft: left
      }, 200);
    }

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

