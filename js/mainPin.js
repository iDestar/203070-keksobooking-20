'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TIP_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormSelect = adForm.querySelectorAll('select');
  var adFormInput = adForm.querySelectorAll('input');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelect = mapFilter.querySelectorAll('select');
  var mapFilterInput = mapFilter.querySelectorAll('input');
  var mainPinLocation = adForm.querySelector('#address');
  var pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  var pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  adForm.classList.add('ad-form--disabled');
  map.classList.add('map--faded');


  var statusDisabled = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', 'true');
    }
  };

  var statusActive = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].removeAttribute('disabled');
    }
  };

  statusDisabled(mapFilterSelect);
  statusDisabled(mapFilterInput);
  statusDisabled(adFormSelect);
  statusDisabled(adFormInput);

  mainPinLocation.removeAttribute('disabled');


  var initlPinMainPosition = function () {
    mainPinLocation.value = pinCenterPositionX + ', ' + pinCenterPositionY;
  };

  initlPinMainPosition();

  var setupAddress = function () {
    var newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    mainPinLocation.value = pinCenterPositionX + ', ' + newPinPositionY;
  };


  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      statusActive(adFormInput);
      statusActive(adFormSelect);
      statusActive(mapFilterSelect);
      statusActive(mapFilterInput);
      setupAddress();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      statusActive(adFormInput);
      statusActive(adFormSelect);
      statusActive(mapFilterSelect);
      statusActive(mapFilterInput);
      setupAddress();
    }
  });
})();
