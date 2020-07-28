'use strict';
(function () {
  var mapButton = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinMove = false;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');

  map.addEventListener('mousemove', function (n) {
    if (pinMove) {
      address.value = (mapButton.offsetTop + MAIN_PIN_HEIGHT) + ', ' + (mapButton.offsetLeft + (MAIN_PIN_WIDTH / 2));
      var x = (n.pageX - map.offsetLeft - (MAIN_PIN_WIDTH / 2));
      var y = (n.pageY - map.offsetTop - (MAIN_PIN_WIDTH / 2));
      if (y > 130 && y < 630) {
        mapButton.style.top = y + 'px';
      }
      if (x > -10 && x < 1150) {
        mapButton.style.left = x + 'px';
      }
    }
  });

  mapButton.addEventListener('mousedown', function () {
    pinMove = true;
  });

  mapButton.addEventListener('mouseup', function () {
    pinMove = false;
    address.value = (mapButton.offsetTop + MAIN_PIN_HEIGHT) + ', ' + (mapButton.offsetLeft + (MAIN_PIN_WIDTH / 2));
  });


})();
