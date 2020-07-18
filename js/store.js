'use strict';

(function () {


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
        data = response;
        for (var i = 0; i < subscrubers.length; i++) {
          if (subscrubers[i] instanceof Function) {
            subscrubers[i](data);
          }
        }

      },
      getData: function () {
        return data;
      },
      getDatabyIndex: function (index) {
        return data[index];
      }
    };
  };
  window.pins = getPins();
  window.load(window.pins.addPins);
  // map.append(getPins(window.data.adMap));
})();
