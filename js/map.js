'use strict';

(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  var pinsList = window.map.querySelector('.map__pins');
  var main = document.querySelector('main');
  var successTemplate = document.getElementById('success').content.querySelector('.success');
  var errorTemplate = document.getElementById('error').content.querySelector('.error');
  var reset = window.form.querySelector('.ad-form__reset');

  var activate = function () {
    window.map.classList.remove('map--faded');
    window.form.classList.remove('ad-form--disabled');
    for (var j = 0; j < window.formElements.length; j++) {
      window.formElements[j].removeAttribute('disabled', '');
    }
  };

  var disactivate = function () {
    var pins = pinsList.querySelectorAll('.map__pin');
    window.form.reset();
    window.map.classList.add('map--faded');
    window.form.classList.add('ad-form--disabled');
    window.pinMain.style.left = MAIN_PIN_LEFT + 'px';
    window.pinMain.style.top = MAIN_PIN_TOP + 'px';
    if (pinsList.querySelector('.map__card')) {
      pinsList.removeChild(pinsList.querySelector('.map__card'));
    }
    for (var k = 0; k < window.formElements.length; k++) {
      window.formElements[k].setAttribute('disabled', '');
    }
    for (var m = 1; m < pins.length; m++) {
      pinsList.removeChild(pins[m]);
    }
    window.addressInput.value = window.getCoords(window.pinMain.style.left) + ', ' + window.getCoords(window.pinMain.style.top);
    window.pinMain.addEventListener('mousedown', onPinMainClick);
    window.pinMain.addEventListener('keydown', onPinMainClick);
  };

  var onPinMainClick = function (evt) {
    if (evt.button === 0 || evt.keyCode === 13) {
      activate();

      var onResetClick = function () {
        disactivate();
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

        disactivate();
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
        document.addEventListener('click', onWindowClick);
        document.addEventListener('keydown', onEscPress);
      };

      var onFormSubmit = function (e) {
        e.preventDefault();
        window.save(new FormData(window.form), onSave, onSubmitError);
        window.form.removeEventListener('submit', onFormSubmit);
      };

      var onPinClick = function (pin, offer) {
        pin.addEventListener('click', function () {
          var activePin = pinsList.querySelector('.map__pin--active');

          if (activePin) {
            activePin.classList.remove('map__pin--active');
            pinsList.removeChild(pinsList.querySelector('.map__card'));
          }

          pin.classList.add('map__pin--active');
          pinsList.appendChild(window.renderCard(offer));

          var card = pinsList.querySelector('.map__card');
          var closeButton = card.querySelector('.popup__close');

          closeButton.addEventListener('click', function () {
            pinsList.removeChild(pinsList.querySelector('.map__card'));
            pin.classList.remove('map__pin--active');
          });

          document.addEventListener('keydown', function (e) {
            if (e.keyCode === 27 && pinsList.querySelector('.map__pin--active') && pinsList.querySelector('.map__card')) {
              pinsList.querySelector('.map__pin--active').classList.remove('map__pin--active');
              pinsList.removeChild(pinsList.querySelector('.map__card'));
            }
          });

          pin.removeEventListener('click', onPinClick);
        });
      };

      var onLoad = function (offers) {
        var fragment = document.createDocumentFragment();

        for (var m = 0; m < MAX_SIMILAR_PIN_COUNT; m++) {
          var currentPin = window.renderPin(offers[m]);
          fragment.appendChild(currentPin);
          onPinClick(currentPin, offers[m]);
        }
        pinsList.appendChild(fragment);
      };

      var onLoadError = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      };

      window.load(onLoad, onLoadError);
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
