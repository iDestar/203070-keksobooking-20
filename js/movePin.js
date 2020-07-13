'use strict';
(function () {
  var mapButton = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinMove = false;

  map.addEventListener('mousemove', function (n) {
    if (pinMove) {
      mapButton.style.left = (n.pageX - map.offsetLeft - 32) + 'px';
      mapButton.style.top = (n.pageY - map.offsetTop - 32) + 'px';
    }
  });

  mapButton.addEventListener('mousedown', function () {
    pinMove = true;
  });

  mapButton.addEventListener('mouseup', function () {
    pinMove = false;
    var form = document.querySelector('.ad-form');

    var address = form.querySelector('#address');
    address.value = (mapButton.offsetTop + 75) + ', ' + (mapButton.offsetLeft + 32);
  });

})();
