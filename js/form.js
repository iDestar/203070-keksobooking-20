'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormGuestNumber = adForm.querySelector('#capacity');
  var map = document.querySelector('.map');

  var closeSuccessCard = function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
    }
  };

  var closeErrorCard = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.remove();
    }
  };

  var successMessageHandler = function (evt) {
    var success = document.querySelector('.success');
    if (evt.type === 'click' || evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      success.removeEventListener('click', successMessageHandler);
      window.checkRoomnadGuest();
      window.formReset();
      closeSuccessCard();
    }
  };

  var errorMessageHandler = function (evnt) {
    var error = document.querySelector('.error');
    if (evnt.type === 'click' || evnt.key === 'Escape') {
      evnt.preventDefault();
      evnt.stopPropagation();
      error.removeEventListener('click', errorMessageHandler);
      error.querySelector('.error__button').removeEventListener('click', errorMessageHandler);
      closeErrorCard();
    }
  };
  var submitHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!window.checkRoomnadGuest()) {
      adFormRoomNumber.setCustomValidity('Выберете корректно');
      return;
    } else {
      adFormRoomNumber.setCustomValidity('');
      adFormGuestNumber.setCustomValidity('');
    }
    window.upload(new FormData(adForm), function () {
      var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      map.appendChild(successMessage);
      successMessage.addEventListener('click', successMessageHandler);
      document.addEventListener('keydown', successMessageHandler);

    }, function () {
      var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      map.appendChild(errorMessage);
      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('click', errorMessageHandler);
      errorMessage.addEventListener('click', errorMessageHandler);
      document.addEventListener('keydown', errorMessageHandler);
    });

  };


  adForm.addEventListener('submit', submitHandler);


  window.checkRoomnadGuest = function () {
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

  window.checkRoomnadGuest();

  adFormRoomNumber.addEventListener('change', function () {
    if (!window.checkRoomnadGuest()) {
      adFormRoomNumber.setCustomValidity('Выберете корректно');
    } else {
      adFormRoomNumber.setCustomValidity('');
      adFormGuestNumber.setCustomValidity('');
    }
  });

  adFormGuestNumber.addEventListener('change', function () {
    if (!window.checkRoomnadGuest()) {
      adFormGuestNumber.setCustomValidity('Выберете корректно');
    } else {
      adFormRoomNumber.setCustomValidity('');
      adFormGuestNumber.setCustomValidity('');
    }
  });

  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });

  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');

  var changeMinPrice = function () {
    switch (type.value) {
      case 'flat':
        price.placeholder = '1000';
        price.min = '1000';
        break;
      case 'bungalo':
        price.placeholder = '0';
        price.min = '0';
        break;
      case 'house':
        price.placeholder = '5000';
        price.min = '5000';
        break;
      case 'palace':
        price.placeholder = '10000';
        price.min = '10000';
        break;
      default:
        price.placeholder = '1000';
        price.min = '1000';
    }
  };

  changeMinPrice();

  type.addEventListener('change', function () {
    changeMinPrice();
  });

})();
