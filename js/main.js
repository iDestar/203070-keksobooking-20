'use strict';
(function () {


  window.removeActiveClassOfMapPin = function () {
    var activeMapPin = document.querySelector('.map__pin--active');
    if (activeMapPin) {
      activeMapPin.classList.remove('map__pin--active');

    }

  };
})();
