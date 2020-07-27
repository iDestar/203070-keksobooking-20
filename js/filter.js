'use strict';
(function () {
  var houseType = document.querySelector('#housing-type');
  var priceType = document.querySelector('#housing-price');
  var roomType = document.querySelector('#housing-rooms');
  var guestType = document.querySelector('#housing-guests');
  var wifi = document.querySelector('#filter-wifi');
  var dishwasher = document.querySelector('#filter-dishwasher');
  var parking = document.querySelector('#filter-parking');
  var washer = document.querySelector('#filter-washer');
  var elevator = document.querySelector('#filter-elevator');
  var conditioner = document.querySelector('#filter-conditioner');

  window.fllter = {
    houseType: 'any',
    priceType: 'any',
    roomType: 'any',
    guestType: 'any',
  };


  houseType.addEventListener('change', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    window.fllter.houseType = type;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);

  });

  priceType.addEventListener('change', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    window.fllter.priceType = type;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);
  });

  roomType.addEventListener('change', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    if (typeof type === 'string') {
      type = +(type);
      window.fllter.roomType = type;
      newtype = window.pins.getDatabyFilters(type);
      window.getPins(newtype);
    }


  });

  guestType.addEventListener('change', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    if (type !== 'any') {
      window.fllter.guestType = +(type);
    } else {
      window.fllter.guestType = type;
    }
    var newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);

  });

  wifi.addEventListener('input', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);
  });

  dishwasher.addEventListener('input', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);
  });

  parking.addEventListener('input', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);
  });

  washer.addEventListener('input', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);
  });

  elevator.addEventListener('input', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);
  });

  conditioner.addEventListener('input', function (evt) {
    window.removePins();
    window.closeCard();
    var type = evt.target.value;
    var newtype;
    newtype = window.pins.getDatabyFilters(type);
    window.getPins(newtype);
  });

})();
