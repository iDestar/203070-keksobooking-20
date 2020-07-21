'use strict';
(function () {
  var somedata = [];
  window.pins.getData(somedata);


  var x = function (data) {

    somedata = data;
  };

  window.load(x);


  window.houseType = document.querySelector('#housing-type');
  window.houseType.value = document.querySelector('#housing-type').value;

  window.houseType.addEventListener('input', function () {
    window.removePins();
    window.pins.renderOfferType(window.getPins);
    if (window.houseType.value === 'any') {
      window.pins.subscrube(window.getPins);
    }

  });


})();
