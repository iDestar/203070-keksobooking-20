'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 22;

  window.formCheckTextSubmit = document.querySelectorAll('checkbox, textarea, .ad-form__submit');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  window.adFormSelect = adForm.querySelectorAll('select, input');
  var mapFilter = document.querySelector('.map__filters');
  window.mapFilterSelect = mapFilter.querySelectorAll('select, input');
  var mainPinLocation = adForm.querySelector('#address');
  var pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  var pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  adForm.classList.add('ad-form--disabled');
  map.classList.add('map--faded');

  window.statusDisabled = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', 'true');
    }
  };

  window.statusActive = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].removeAttribute('disabled');
    }
  };

  window.statusDisabled(window.formCheckTextSubmit);
  window.statusDisabled(window.mapFilterSelect);
  window.statusDisabled(window.adFormSelect);


  mainPinLocation.removeAttribute('disabled');


  window.initlPinMainPosition = function () {
    mainPinLocation.value = pinCenterPositionX + ', ' + pinCenterPositionY;
  };

  window.initlPinMainPosition();

  window.setupAddress = function () {
    var newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    mainPinLocation.value = pinCenterPositionX + ', ' + newPinPositionY;
  };


  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      window.statusActive(window.formCheckTextSubmit);
      window.statusActive(window.mapFilterSelect);
      window.statusActive(window.adFormSelect);
      window.setupAddress();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      window.statusActive(window.formCheckTextSubmit);
      window.statusActive(window.mapFilterSelect);
      window.statusActive(window.adFormSelect);
      window.setupAddress();
    }
  });


})();
