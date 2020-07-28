'use strict';
(function () {

  window.formCheckTextSubmit = document.querySelectorAll('checkbox, textarea, .ad-form__submit');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  window.adFormSelect = adForm.querySelectorAll('select, input');
  var mapFilter = document.querySelector('.map__filters');
  window.mapFilterSelect = mapFilter.querySelectorAll('select, input');
  var mainPinLocation = adForm.querySelector('#address');
  adForm.classList.add('ad-form--disabled');
  map.classList.add('map--faded');

  window.statusDisabled = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', 'true');
      if (elem[i] === mainPinLocation) {
        elem[i].removeAttribute('disabled');
      }
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

  window.locationMainPin();

  window.flagForPin = true;


  mainPin.addEventListener('click', function (evt) {
    if (evt.which === 1) {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      window.statusActive(window.formCheckTextSubmit);
      window.statusActive(window.mapFilterSelect);
      window.statusActive(window.adFormSelect);
      if (window.flagForPin === true) {
        window.pins.subscrube(window.getPins);
        window.flagForPin = false;
      }
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      window.statusActive(window.formCheckTextSubmit);
      window.statusActive(window.mapFilterSelect);
      window.statusActive(window.adFormSelect);
      if (window.flagForPin === true) {
        window.pins.subscrube(window.getPins);
        window.flagForPin = false;
      }
    }
  });


})();
