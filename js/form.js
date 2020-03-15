'use strict';

(function () {
  var roomNumberSelect = document.getElementById('room_number');
  var capacitySelect = document.getElementById('capacity');
  var typeSelect = document.getElementById('type');
  var priceInput = document.getElementById('price');
  var checkinSelect = document.getElementById('timein');
  var checkoutSelect = document.getElementById('timeout');

  for (var i = 0; i < window.formElements.length; i++) {
    window.formElements[i].setAttribute('disabled', '');
  }

  window.addressInput.value = window.getCoords(window.pinMain.style.left) + ', ' + window.getCoords(window.pinMain.style.top);

  var onSubmitClick = function () {
    var capacityMessage = '';
    var minPriceMessage = '';
    var checkoutMessage = '';

    if (roomNumberSelect.value === '1' && capacitySelect.value !== '1') {
      capacityMessage = '1 комната = 1 гость';
    } else if (roomNumberSelect.value === '2' && capacitySelect.value !== '1' && capacitySelect.value !== '2') {
      capacityMessage = '2 комнаты = 1 гость или 2 гостя';
    } else if (roomNumberSelect.value === '3' && capacitySelect.value === '0') {
      capacityMessage = '3 комнаты = 1 гость, 2 гостя или 3 гостя';
    } else if (roomNumberSelect.value === '100' && capacitySelect.value !== '0') {
      capacityMessage = '100 комнат = не для гостей';
    }

    capacitySelect.setCustomValidity(capacityMessage);

    if (typeSelect.value === 'flat' && priceInput.value < 1000) {
      minPriceMessage = 'Квартиры от 1 000₽/ночь';
    } else if (typeSelect.value === 'house' && priceInput.value < 5000) {
      minPriceMessage = 'Дома от 5 000₽/ночь';
    } else if (typeSelect.value === 'palace' && priceInput.value < 10000) {
      minPriceMessage = 'Дворец от 10 000₽/ночь';
    }

    priceInput.setCustomValidity(minPriceMessage);

    if (checkinSelect.value !== checkoutSelect.value) {
      checkoutMessage = 'Время заезда и выезда должно совпадать';
    }

    checkoutSelect.setCustomValidity(checkoutMessage);

    window.offerImagesInput.setCustomValidity('');
    if (window.offerImagesInput.files.length > 0) {
      for (var q = 0; q < window.offerImagesInput.files.length; q++) {
        if (!window.offerImagesInput.files[q].type.match('image.*')) {
          window.offerImagesInput.setCustomValidity('Только картинки!');
        }
      }
    }

    window.avatarInput.setCustomValidity('');
    if (window.avatarInput.files.length > 0 && !window.avatarInput.files[0].type.match('image.*')) {
      window.avatarInput.setCustomValidity('Только картинки!');
    }
  };

  window.submitButton.addEventListener('click', onSubmitClick);

  var onTypeChange = function () {
    if (typeSelect.value === 'bungalo') {
      priceInput.setAttribute('placeholder', '0');
      priceInput.setAttribute('value', 0);
    } else if (typeSelect.value === 'flat') {
      priceInput.setAttribute('placeholder', '1000');
      priceInput.setAttribute('value', 1000);
    } else if (typeSelect.value === 'house') {
      priceInput.setAttribute('placeholder', '5000');
      priceInput.setAttribute('value', 5000);
    } else if (typeSelect.value === 'palace') {
      priceInput.setAttribute('placeholder', '10000');
      priceInput.setAttribute('value', 10000);
    }
  };

  var onPriceChange = function () {
    typeSelect.removeEventListener('change', onTypeChange);
    priceInput.removeEventListener('change', onPriceChange);
  };

  typeSelect.addEventListener('change', onTypeChange);
  priceInput.addEventListener('change', onPriceChange);

  checkoutSelect.addEventListener('change', function () {
    checkinSelect.value = checkoutSelect.value;
  });

  checkinSelect.addEventListener('change', function () {
    checkoutSelect.value = checkinSelect.value;
  });
})();
