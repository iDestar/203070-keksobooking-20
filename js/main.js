'use strict';

var MAP_PINS = 8;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var PIN_TIP_HEIGHT = 22;

var map = document.querySelector('.map');

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


var removePopup = function () {
  var popupWindow = document.querySelector('.popup');

  if (popupWindow) {
    popupWindow.remove();
  }
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};


var closePopup = function () {
  removePopup();
  document.removeEventListener('keydown', onPopupEscPress);
};

var getCard = function (data) {
  var cardTemplate = document.querySelector('#card').content;
  var cardElement = cardTemplate.cloneNode(true);
  var popupClose = cardElement.querySelector('.popup__close');

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

  var addCardPhotos = function (datas, template) {
    var photos = template.querySelector('.popup__photos');
    var img = template.querySelector('.popup__photo');
    img.src = datas.offer.photos[0];
    if (datas.offer.photos.length > 1) {
      for (var i = 1; i < datas.offer.photos.length; i++) {
        var newImg = img.cloneNode(true);
        photos.appendChild(newImg);
        newImg.src = datas.offer.photos[i];
      }
    }
  };

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
  addCardPhotos(data, cardElement);
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;

  popupClose.addEventListener('click', function () {
    closePopup();
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });

  return cardElement;

};


var mapFilterContainer = document.querySelector('.map__filters-containe');


var mapPins = document.querySelector('.map__pins');
var mainPin = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormSelect = adForm.querySelectorAll('select');
var adFormInput = adForm.querySelectorAll('input');
var mapFilter = document.querySelector('.map__filters');
var mapFilterSelect = mapFilter.querySelectorAll('select');
var mapFilterInput = mapFilter.querySelectorAll('input');
var mainPinLocation = adForm.querySelector('#address');
var pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
var pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormGuestNumber = adForm.querySelector('#capacity');
adForm.classList.add('ad-form--disabled');
map.classList.add('map--faded');

var statusDisabled = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute('disabled', 'true');
  }
};

var statusActive = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].removeAttribute('disabled');
  }
};

statusDisabled(mapFilterSelect);
statusDisabled(mapFilterInput);
statusDisabled(adFormSelect);
statusDisabled(adFormInput);

mainPinLocation.removeAttribute('disabled');


var initlPinMainPosition = function () {
  mainPinLocation.value = pinCenterPositionX + ', ' + pinCenterPositionY;
};

initlPinMainPosition();

var setupAddress = function () {
  var newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
  mainPinLocation.value = pinCenterPositionX + ', ' + newPinPositionY;
};


mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    statusActive(adFormInput);
    statusActive(adFormSelect);
    statusActive(mapFilterSelect);
    statusActive(mapFilterInput);
    setupAddress();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    statusActive(adFormInput);
    statusActive(adFormSelect);
    statusActive(mapFilterSelect);
    statusActive(mapFilterInput);
    setupAddress();
  }
});

var checkRoomnadGuest = function () {
  var roomNumber = adFormRoomNumber.value;
  var guestNumber = adFormGuestNumber.value;
  var isValid;

  if (roomNumber === '1' && guestNumber !== '1') {
    isValid = false;
  } else if (roomNumber === '2' && (guestNumber === '3' || guestNumber === '0')) {
    isValid = false;
  } else if (roomNumber === '3' && guestNumber === '0') {
    isValid = false;
  } else if (roomNumber === '100' && guestNumber !== '0') {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
};

adFormRoomNumber.addEventListener('change', function () {
  if (!checkRoomnadGuest()) {
    adFormRoomNumber.setCustomValidity('Выберете корректно');
  } else {
    adFormRoomNumber.setCustomValidity('');
    adFormGuestNumber.setCustomValidity('');
  }
});

adFormGuestNumber.addEventListener('change', function () {
  if (!checkRoomnadGuest()) {
    adFormGuestNumber.setCustomValidity('Выберете корректно');
  } else {
    adFormRoomNumber.setCustomValidity('');
    adFormGuestNumber.setCustomValidity('');
  }
});


var mapPinsCard = document.querySelectorAll('.map__pin');


var elc = function (element, data) {
  element.addEventListener('click', function () {
    map.insertBefore(getCard(data), mapFilterContainer);
  });
};

var openPopupCard = function (pins, arr) {
  for (var i = 0; i < mapPinsCard.length; i++) {
    elc(pins[i + 1], arr[i]);
  }
};

openPopupCard(mapPinsCard, adMap);
