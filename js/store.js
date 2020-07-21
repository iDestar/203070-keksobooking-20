'use strict';

(function () {


  var getPins = function () {
    var data = [];
    var subscrubers = [];
    return {
      renderOfferType: function (render) {
        return render(data.filter(function (obj) {
          return obj.offer.type === window.houseType.value;
        }));
      },
      subscrube: function (cb) {
        if (cb instanceof Function) {
          subscrubers.push(cb);
          cb(data);
        }
      },
      addPins: function (response) {
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
      getDatabyIndex: function (index) {
        return data[index];
      }
    };
  };
  window.pins = getPins();
  window.load(window.pins.addPins);
  window.load(window.pins.getData);

})();
