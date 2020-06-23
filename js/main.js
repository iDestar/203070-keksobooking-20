'use strict';

var MAP_PINS = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var getPins = function (data) {
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < data.length; j++) {
    var elem = template.cloneNode(true);
    var img = elem.children[0];
    elem.style = 'left: ' + (data[j].location.x - 25) + 'px; top: ' + (data[j].location.y - 70) + 'px;';
    img.src = data[j].author.avatar;
    img.alt = data[j].offer.title;

    fragment.append(elem);
  }

  return fragment;
};

var adMap = getPinsAd();
map.append(getPins(adMap));


var getCard = function (data) {
  var cardTemplate = document.querySelector('#card').content;
  var cardElement = cardTemplate.cloneNode(true);
  var cardFragment = document.createDocumentFragment();

  var getCardFeatures = function () {
    for (var i = 0; i < data.offer.features.length; i++) {
      if (data.offer.features[i] === 'wifi') {
        cardElement.querySelector('.popup__feature--wifi').textContent = 'wifi';
      } if (data.offer.features[i] === 'dishwasher') {
        cardElement.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
      } if (data.offer.features[i] === 'parking') {
        cardElement.querySelector('.popup__feature--parking').textContent = 'parking';
      } if (data.offer.features[i] === 'washer') {
        cardElement.querySelector('.popup__feature--washer').textContent = 'washer';
      } if (data.offer.features[i] === 'elevator') {
        cardElement.querySelector('.popup__feature--elevator').textContent = 'elevator';
      } if (data.offer.features[i] === 'conditioner') {
        cardElement.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
      }
    }
  };

  function generateSrcPhoto(arr, classElem, cardElem, classBlock) {
    var cardTempElement = cardElement.querySelector(classElem);
    var cardBlockElement = cardElement.querySelector(classBlock);
    cardTempElement.src = arr[0];
    arr.forEach(function (el) {
      var cardEl = cardTempElement.cloneNode(true);
      cardEl.src = el;
      cardFragment.appendChild(cardEl);
    });
    cardBlockElement.appendChild(cardFragment);
  }

  var getOfferType = function () {
    if (data.offer.type === 'flat') {
      return 'Квартира';
    } if (data.offer.type === 'palace') {
      return 'Дворец';
    } if (data.offer.type === 'bungalo') {
      return 'Бунгало';
    } if (data.offer.type === 'house') {
      return 'Дом';
    }
    return ' ';
  };

  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getOfferType(data.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardElement.querySelector('.popup__feature').textContent = getCardFeatures(data.offer.features);
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  cardElement.querySelector('.popup__photo').src = generateSrcPhoto(data.offer.photos, '.popup__photo', cardElement, '.popup__photos');
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;
  return cardElement;

};


var mapFilter = document.querySelector('.map__filters-containe');

map.insertBefore(getCard(adMap[0]), mapFilter);
