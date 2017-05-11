define(['http'], function (Http) {
  var API = {

    // 获取数据失败标志位
    failed: 'failed',

    getTestData: function () {
      return Http.get('api/test.json')
        .then(handleSuccess, handleError);
    }
  };

  function handleSuccess(data) {
    f7.hideIndicator();

    return data;
  }

  function handleError(msg) {
    f7.hideIndicator();
    f7.alert(msg);

    return API.failed;
  }

  return API;
});
