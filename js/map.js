'use strict';

(function () {
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  var main = document.querySelector('main');
  var successTemplate = document.getElementById('success').content.querySelector('.success');
  var errorTemplate = document.getElementById('error').content.querySelector('.error');
  var reset = window.form.querySelector('.ad-form__reset');
  var avatarPreview = window.form.querySelector('.ad-form-header__preview-img');
  var offerImagePreview = window.form.querySelector('.ad-form__photo-preview');

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
    showPicture(window.avatarInput, avatarPreview);
  };

  var onOfferImageChange = function () {
    showPicture(window.offerImagesInput, offerImagePreview);
  };


  var activate = function () {
    window.map.classList.remove('map--faded');
    window.form.classList.remove('ad-form--disabled');
    window.avatarInput.addEventListener('change', onAvatarChange);
    window.offerImagesInput.addEventListener('change', onOfferImageChange);
    for (var j = 0; j < window.formElements.length; j++) {
      window.formElements[j].removeAttribute('disabled', '');
    }
    window.load(window.onLoad, window.onLoadError);
  };

  var deactivate = function () {
    var pins = window.pinsList.querySelectorAll('.map__pin');
    window.submitButton.blur();
    window.form.reset();
    window.map.classList.add('map--faded');
    window.form.classList.add('ad-form--disabled');
    window.avatarInput.removeEventListener('change', onAvatarChange);
    window.offerImagesInput.removeEventListener('change', onOfferImageChange);
    avatarPreview.src = 'img/muffin-grey.svg';
    offerImagePreview.src = 'img/muffin-grey.svg';
    window.pinMain.style.left = MAIN_PIN_LEFT + 'px';
    window.pinMain.style.top = MAIN_PIN_TOP + 'px';
    if (window.pinsList.querySelector('.map__card')) {
      window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
    }
    for (var k = 0; k < window.formElements.length; k++) {
      window.formElements[k].setAttribute('disabled', '');
    }
    for (var m = 1; m < pins.length; m++) {
      window.pinsList.removeChild(pins[m]);
    }
    window.addressInput.value = window.getCoords(window.pinMain.style.left) + ', ' + window.getCoords(window.pinMain.style.top);
    window.pinMain.addEventListener('mousedown', onPinMainClick);
    window.pinMain.addEventListener('keydown', onPinMainClick);
  };

  var onPinMainClick = function (evt) {
    if (evt.button === 0 || evt.keyCode === 13) {
      activate();

      var onResetClick = function () {
        deactivate();
        reset.removeEventListener('click', onResetClick);
      };

      var onSave = function () {
        var onEscPress = function (e) {
          if (e.keyCode === 27 && main.contains(successTemplate)) {
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

        deactivate();
        main.appendChild(successTemplate);
        document.addEventListener('click', onWindowClick);
        document.addEventListener('keydown', onEscPress);
      };

      var onSubmitError = function () {
        var onEscPress = function (e) {
          if (e.keyCode === 27 && main.contains(errorTemplate)) {
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
        window.submitButton.blur();
        document.addEventListener('click', onWindowClick);
        document.addEventListener('keydown', onEscPress);
      };

      var onFormSubmit = function (e) {
        e.preventDefault();
        window.save(new FormData(window.form), onSave, onSubmitError);
        window.form.removeEventListener('submit', onFormSubmit);
      };

      window.form.addEventListener('submit', onFormSubmit);
      reset.addEventListener('click', onResetClick);
      window.addressInput.value = (Number.parseInt(window.pinMain.style.left, 10) + window.PIN_WIDTH / 2) + ', ' + (Number.parseInt(window.pinMain.style.top, 10) + window.PIN_HEIGHT);
      window.pinMain.removeEventListener('mousedown', onPinMainClick);
      window.pinMain.removeEventListener('keydown', onPinMainClick);
    }
  };

  window.pinMain.addEventListener('mousedown', onPinMainClick);
  window.pinMain.addEventListener('keydown', onPinMainClick);
})();
