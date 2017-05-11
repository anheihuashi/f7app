define(['utils'], function (Utils) {
  function render(selector, data) {
    var template = $$('script' + selector);
    var templateStr = template.html();
    var parent = template.parent();
    var compiledTemplate = Template7.compile(templateStr);

    parent.append(compiledTemplate(data));
  }

  function register() {

    /* eslint no-eval: "off" */
    Template7.registerHelper('compare', function (expression, options) {
      var func;
      if (expression.indexOf('return') >= 0) {
        func = '(function(){' + expression + '})';
      } else {
        func = '(function(){return (' + expression + ')})';
      }
      var context = Utils.merge(this, options.data);
      var condition = eval.call(context, func).call(context);
      if (condition) {
        return options.fn(this, options.data);
      } else {
        return options.inverse(this, options.data);
      }
    });
  }

  return {
    render: render,
    register: register
  };
});
