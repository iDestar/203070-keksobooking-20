'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var isOpen = false;

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
    isOpen = false;
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

    popupClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      closePopup();
    });

    popupClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        closePopup();
      }
    });

    return cardElement;

  };

  var mapFaded = document.querySelector('.map--faded');

  var findPin = function (node) {
    if (node.tagName === 'BUTTON' && node.dataset.id) {
      return +(node.dataset.id);
    }
    return node.tagName !== 'BODY' && findPin(node.parentNode);

  };


  mapFaded.addEventListener('click', function (evt) {
    var target = evt.target;
    var find = findPin(target);
    if (typeof find === 'number') {
      if (isOpen) {
        closePopup();
      }
      isOpen = true;
      map.insertBefore(getCard(window.data.adMap[find]), mapFilterContainer);
    }
  }
  );


})();
