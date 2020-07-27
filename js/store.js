'use strict';

(function () {

  var price = {
    low: {
      to: 0,
      from: 10000
    },
    high: {
      to: 50000,
      from: Infinity
    },
    middle: {
      to: 10000,
      from: 50000
    },
  };

  var getPins = function () {
    var data = [];
    var subscrubers = [];
    return {
      subscrube: function (cb) {
        if (cb instanceof Function) {
          subscrubers.push(cb);
          cb(data);
        }
      },
      addPins: function (response) {
        data = [];
        for (var j = 0; j < response.length; j++) {
          response[j].id = j;
        }

        data = response;
        for (var i = 0; i < subscrubers.length; i++) {
          if (subscrubers[i] instanceof Function) {
            subscrubers[i](data);
          }
        }
      },
      getData: function (arr) {
        arr = arr.concat(data);
        return arr;
      },
      getDatabyId: function (id) {
        return data.find(function (i) {
          return i.id === id;
        });
      },
      getDataByHouseType: function (obj) {

        if (window.fllter.houseType === 'any') {
          return true;
        }

        return obj.offer.type === window.fllter.houseType;

      },
      getDataByPrice: function (obj) {

        if (window.fllter.priceType === 'any') {
          return true;
        }

        return obj.offer.price >= price[window.fllter.priceType].to && obj.offer.price <= price[window.fllter.priceType].from;
      },
      getDataByRooms: function (obj) {
        if (window.fllter.roomType === 'any') {
          return true;
        }
        return obj.offer.rooms === window.fllter.roomType;
      },
      getDataByGuest: function (obj) {

        if (window.fllter.guestType === 'any') {
          return true;
        }

        return obj.offer.guests === window.fllter.guestType;

      },
      getDataByFeatures: function (obj) {
        var checkedFeatures = document.querySelectorAll('input[name="features"]:checked');
        return Array.from(checkedFeatures).every(function (checkedFeature) {
          return obj.offer.features.includes(checkedFeature.value);
        });

      },

      getDatabyFilters: function () {
        return data.filter(function (obj) {
          return window.pins.getDataByHouseType(obj)
              && window.pins.getDataByPrice(obj)
              && window.pins.getDataByRooms(obj)
              && window.pins.getDataByGuest(obj)
              && window.pins.getDataByFeatures(obj);

        });
      }
    };
  };
  window.pins = getPins();
  window.load(window.pins.addPins);

})();
