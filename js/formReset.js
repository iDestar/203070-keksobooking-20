'use strict';
(function () {

  var MAIN_PIN_LOCATION_TOP = 375;
  var MAIN_PIN_LOCATION_LEFT = 570;
  var MAIN_PIN_ADDRESS_LOCATION_X = 450;
  var MAIN_PIN_ADDRESS_LOCATION_Y = 602;

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var title = document.querySelector('#title');
  var description = document.querySelector('#description');
  var adFormReset = document.querySelector('.ad-form__reset');

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.formReset();
  });

  window.closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var removeText = function () {
    title.value = '';
    description.value = '';
  };


  window.removePins = function () {
    var pins = document.querySelectorAll('.map__pin[type="button"]');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var mainPinLocation = document.querySelector('.map__pin--main');
  var addressLocation = document.querySelector('#address');

  window.locationMainPin = function () {

    mainPinLocation.style.top = MAIN_PIN_LOCATION_TOP + 'px';
    mainPinLocation.style.left = MAIN_PIN_LOCATION_LEFT + 'px';

    addressLocation.value = MAIN_PIN_ADDRESS_LOCATION_X + ', ' + MAIN_PIN_ADDRESS_LOCATION_Y;
  };

  window.formReset = function () {

    removeText();
    window.statusDisabled(window.formCheckTextSubmit);
    window.statusDisabled(window.mapFilterSelect);
    window.statusDisabled(window.adFormSelect);
    window.locationMainPin();
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    window.closeCard();
    window.removePins();
    window.flagForPin = true;
  };
})();
