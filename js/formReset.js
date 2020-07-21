'use strict';
(function () {

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var title = document.querySelector('#title');
  var description = document.querySelector('#description');

  var closeCard = function () {
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

  window.formReset = function () {
    removeText();
    window.statusDisabled(window.formCheckTextSubmit);
    window.statusDisabled(window.mapFilterSelect);
    window.statusDisabled(window.adFormSelect);
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    closeCard();
    window.removePins();
    window.flagForPin = true;
  };
})();
