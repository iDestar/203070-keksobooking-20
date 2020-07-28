'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var isActive;
  var isOpen = false;

  var findPin = function (node) {
    if (node.tagName === 'BUTTON' && node.dataset.id) {
      return +(node.dataset.id);
    }
    return node.tagName !== 'BODY' && findPin(node.parentNode);

  };

  window.removeActiveClassOfMapPin = function () {
    var activeMapPin = document.querySelector('.map__pin--active');
    if (activeMapPin) {
      activeMapPin.classList.remove('map__pin--active');
      isActive = false;
    }
  };


  map.addEventListener('click', function (evt) {
    var target = evt.target;
    var find = findPin(target);
    var activePin = document.querySelector('.map__pin--active');
    if (isActive) {
      activePin.classList.remove('map__pin--active');
      isActive = false;
    }

    if (typeof find === 'number' && !isActive) {
      if (target.tagName === 'IMG') {
        target.parentNode.classList.add('map__pin--active');
        isActive = true;
      } else {
        target.classList.add('map__pin--active');
        isActive = true;
      }

  });

  return cardElement;

