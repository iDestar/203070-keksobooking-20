'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapFaded = document.querySelector('.map--faded');
  var isOpen = false;

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
      map.insertBefore(window.card.getCard((window.data.adMap[find])), mapFilterContainer);
    }
  }
  );

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

  window.showCard = {
    closePopup: closePopup
  };

})();
