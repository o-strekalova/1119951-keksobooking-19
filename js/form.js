'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.getElementById('success').content.querySelector('.success');
  var errorTemplate = document.getElementById('error').content.querySelector('.error');
  var form = document.querySelector('.ad-form');
  var formElements = document.querySelectorAll('.ad-form__element');
  var avatarInput = document.getElementById('avatar');
  var avatarPreview = form.querySelector('.ad-form-header__preview-img');
  var roomNumberSelect = document.getElementById('room_number');
  var capacitySelect = document.getElementById('capacity');
  var typeSelect = document.getElementById('type');
  var priceInput = document.getElementById('price');
  var checkinSelect = document.getElementById('timein');
  var checkoutSelect = document.getElementById('timeout');
  var offerImagePreview = form.querySelector('.ad-form__photo-preview');
  var offerImagesInput = document.getElementById('images');
  var reset = form.querySelector('.ad-form__reset');
  var submitButton = form.querySelector('.ad-form__submit');

  formElements.forEach(function (element) {
    element.setAttribute('disabled', '');
  });

  window.addressInput.value = window.getAddress();

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

    offerImagesInput.setCustomValidity('');
    if (offerImagesInput.files.length > 0) {
      for (var q = 0; q < offerImagesInput.files.length; q++) {
        if (!offerImagesInput.files[q].type.match('image.*')) {
          offerImagesInput.setCustomValidity('Только картинки!');
        }
      }
    }

    avatarInput.setCustomValidity('');
    if (avatarInput.files.length > 0 && !avatarInput.files[0].type.match('image.*')) {
      avatarInput.setCustomValidity('Только картинки!');
    }
  };

  var onTypeChange = function () {
    switch (typeSelect.value) {
      case 'bungalo':
        priceInput.setAttribute('placeholder', '0');
        priceInput.setAttribute('value', 0);
        break;
      case 'flat':
        priceInput.setAttribute('placeholder', '1000');
        priceInput.setAttribute('value', 1000);
        break;
      case 'house':
        priceInput.setAttribute('placeholder', '5000');
        priceInput.setAttribute('value', 5000);
        break;
      case 'palace':
        priceInput.setAttribute('placeholder', '10000');
        priceInput.setAttribute('value', 10000);
        break;
      default:
        break;
    }
  };

  var onPriceChange = function () {
    typeSelect.removeEventListener('change', onTypeChange);
    priceInput.removeEventListener('change', onPriceChange);
  };

  var onCheckoutChange = function () {
    checkinSelect.value = checkoutSelect.value;
  };

  var onCheckinChange = function () {
    checkoutSelect.value = checkinSelect.value;
  };

  var showPicture = function (input, preview) {
    if (input.files[0].type.match('image.*')) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(input.files[0]);
    }
  };

  var onAvatarChange = function () {
    showPicture(avatarInput, avatarPreview);
  };

  var onOfferImageChange = function () {
    showPicture(offerImagesInput, offerImagePreview);
  };

  var onFormSubmit = function (e) {
    e.preventDefault();
    window.save(new FormData(form), onSave, onSubmitError);
    form.removeEventListener('submit', onFormSubmit);
  };

  var onSubmitError = function () {
    var onEscPress = function (e) {
      if (e.keyCode === window.ESC && main.contains(errorTemplate)) {
        main.removeChild(errorTemplate);
        document.removeEventListener('keydown', onEscPress);
      }
    };

    var onWindowClick = function () {
      if (main.contains(errorTemplate)) {
        main.removeChild(errorTemplate);
        document.removeEventListener('click', onWindowClick);
      }
    };

    main.appendChild(errorTemplate);
    document.addEventListener('click', onWindowClick);
    document.addEventListener('keydown', onEscPress);
  };

  var onResetClick = function () {
    window.deactivate();
    reset.removeEventListener('click', onResetClick);
  };

  var onSave = function () {
    var onEscPress = function (e) {
      if (e.keyCode === window.ESC && main.contains(successTemplate)) {
        main.removeChild(successTemplate);
        document.removeEventListener('keydown', onEscPress);
      }
    };

    var onWindowClick = function () {
      if (main.contains(successTemplate)) {
        main.removeChild(successTemplate);
        document.removeEventListener('click', onWindowClick);
      }
    };

    window.deactivate();
    main.appendChild(successTemplate);
    document.addEventListener('click', onWindowClick);
    document.addEventListener('keydown', onEscPress);
  };

  window.activateFrom = function () {
    form.classList.remove('ad-form--disabled');
    formElements.forEach(function (element) {
      element.removeAttribute('disabled', '');
    });

    avatarInput.addEventListener('change', onAvatarChange);
    offerImagesInput.addEventListener('change', onOfferImageChange);
    typeSelect.addEventListener('change', onTypeChange);
    priceInput.addEventListener('change', onPriceChange);
    checkoutSelect.addEventListener('change', onCheckoutChange);
    checkinSelect.addEventListener('change', onCheckinChange);
    submitButton.addEventListener('click', onSubmitClick);
    form.addEventListener('submit', onFormSubmit);
    reset.addEventListener('click', onResetClick);
  };

  window.deactivateForm = function () {
    submitButton.blur();
    form.reset();
    form.classList.add('ad-form--disabled');
    avatarPreview.src = 'img/muffin-grey.svg';
    offerImagePreview.src = 'img/muffin-grey.svg';
    formElements.forEach(function (element) {
      element.setAttribute('disabled', '');
    });
    window.addressInput.value = window.getAddress();

    avatarInput.removeEventListener('change', onAvatarChange);
    offerImagesInput.removeEventListener('change', onOfferImageChange);
    typeSelect.removeEventListener('change', onTypeChange);
    priceInput.removeEventListener('change', onPriceChange);
    checkoutSelect.removeEventListener('change', onCheckoutChange);
    checkinSelect.removeEventListener('change', onCheckinChange);
    submitButton.removeEventListener('click', onSubmitClick);
    form.removeEventListener('submit', onFormSubmit);
    reset.removeEventListener('click', onResetClick);
  };
})();
