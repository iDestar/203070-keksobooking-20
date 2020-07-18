'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormGuestNumber = adForm.querySelector('#capacity');
  var map = document.querySelector('.map');
  var adFormReset = document.querySelector('.ad-form__reset');

  adFormReset.addEventListener('click', function () {
    window.formReset();
  });

  var submitHandler = function (evt) {
    window.upload(new FormData(adForm), function () {


      var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      successMessage.addEventListener('click', function () {
        successMessage.remove();
      });
      successMessage.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          evt.preventDefault();
          successMessage.remove();
        }
      });

      map.appendChild(successMessage);
      window.formReset();
    }, function () {
      var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      map.appendChild(errorMessage);
      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        errorMessage.remove();
      });
      errorMessage.addEventListener('click', function () {
        errorMessage.remove();
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          evt.preventDefault();
          errorMessage.remove();
        }
      });

    });
    evt.preventDefault();
  };


  adForm.addEventListener('submit', submitHandler);


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

  type.addEventListener('change', function () {
    changeMinPrice();
  });

})();
