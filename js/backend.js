'use strict';


(function () {
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var send = function (url, onSuccess, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.upload = function (data, onSuccess, onError) {
    send(URL_POST, onSuccess, onError, 'POST', data);
  };
  //
  window.load = function (onSuccess, onError) {
    send(URL_GET, onSuccess, onError, 'GET', {});
  };
})();
