/* global define, require, $$, f7, mainView, secondView, thirdView */

define([], function () {
  'use strict';

  var Router = {
    init: function () {
      // 监听页面初始化
      f7.onPageInit('*', function (page) {
        load(page.name, page.query); // 加载页面 controller
      });

      // 应用 root 路由
      rootRoute();
    }
  };

  /**
   * Load (or reload) controller from js code (another controller) - call it's init function
   * @param  name     页面控制器名称，取自 data-page
   * @param  query    页面 url 的 query 部分，比如 user.html?id=1001 中的 { id: 1001 }
   */
  function load(name, query) {
    if (!name || name.indexOf('smart-select') !== -1) {
      return;
    }

    require(['controllers/' + name + '.ctrl'], function (controller) {
      controller.init(query);
    });
  }

  function rootRoute() {
    mainView.router.load({
      url: 'demo/demo1.html',
      animatePages: false
    });
  }

  return Router;
});
