define(['api', 'template'], function (API, Template) {
  var Controller = {
    init: function () {
      API.getTestData().then(function (data) {
        if (data === API.failed) { return; }

        Template.render('#aboutTpl', data);
      });
    }
  };

  return Controller;
});
