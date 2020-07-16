'use strict';
(function () {
  var mapButton = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinMove = false;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  map.addEventListener('mousemove', function (n) {
    if (pinMove) {
      mapButton.style.left = (n.pageX - map.offsetLeft - (MAIN_PIN_WIDTH / 2)) + 'px';
      mapButton.style.top = (n.pageY - map.offsetTop - (MAIN_PIN_WIDTH / 2)) + 'px';
    }
  });

  mapButton.addEventListener('mousedown', function () {
    pinMove = true;
  });

  mapButton.addEventListener('mouseup', function () {
    pinMove = false;
    var form = document.querySelector('.ad-form');
    var address = form.querySelector('#address');
    address.value = (mapButton.offsetTop + MAIN_PIN_HEIGHT) + ', ' + (mapButton.offsetLeft + (MAIN_PIN_WIDTH / 2));
  });

})();
