'use strict';
(function () {

  var MAP_PINS = 8;

  var getRandomNubmer = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomItem = function (items) {
    return items[Math.floor(Math.random() * items.length)];
  };

  var getLocation = function () {
    var locationX = Math.floor(Math.random() * (1000 - 100) + 100);
    var locationY = Math.floor(Math.random() * (1000 - 100) + 100);
    return locationX + ', ' + locationY;
  };

  var getRandomItems = function (items, num) {
    return items.splice(Math.floor(Math.random() * num));
  };

  var getPinsAd = function () {
    var pinsData = [];
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var checkin = ['12:00', '13:00', '14:00'];
    var checkout = ['12:00', '13:00', '14:00'];
    var houseFotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var imgNumber = 1;

    for (var i = 0; i < MAP_PINS; i++) {

      pinsData.push(
          {
            author: {
              avatar: 'img/avatars/user' + '0' + (imgNumber + i) + '.png',
            },
            offer: {
              title: 'Обьявление',
              address: getLocation(),
              price: getRandomNubmer(1000, 10000),
              type: getRandomItem(types),
              rooms: getRandomNubmer(1, 10),
              guests: getRandomNubmer(1, 3),
              checkin: getRandomItem(checkin),
              checkout: getRandomItem(checkout),
              features: getRandomItems(features, 6),
              description: 'Описание',
              photos: getRandomItems(houseFotos, 3)
            },
            location: {
              x: getRandomNubmer(10, 1200),
              y: getRandomNubmer(130, 630),
            }
          }
      );
    }
    return pinsData;
  };

  var adMap = getPinsAd();

  window.data = {
    adMap: adMap
  };

})();
