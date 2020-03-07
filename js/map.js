'use strict';

(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;
  var pinsList = window.map.querySelector('.map__pins');

  var onButtonClick = function (evt) {
    if (evt.button === 0 || evt.keyCode === 13) {
      window.map.classList.remove('map--faded');
      window.form.classList.remove('ad-form--disabled');

      for (var j = 0; j < window.formElements.length; j++) {
        window.formElements[j].removeAttribute('disabled', '');
      }

      var onCardClick = function (pin, offer) {
        pin.addEventListener('click', function () {
          if (pinsList.querySelector('.map__card')) {
            pinsList.removeChild(pinsList.querySelector('.map__card'));
          }
          pinsList.appendChild(window.renderCard(offer));
          var card = pinsList.querySelector('.map__card');
          var closeButton = card.querySelector('.popup__close');

          closeButton.addEventListener('click', function () {
            pinsList.removeChild(pinsList.querySelector('.map__card'));
          });

          document.addEventListener('keydown', function (e) {
            if (e.keyCode === 27 && pinsList.querySelector('.map__card')) {
              pinsList.removeChild(pinsList.querySelector('.map__card'));
            }
          });

          pin.removeEventListener('click', onCardClick);
        });
      };

      var onSuccess = function (offers) {
        var fragment = document.createDocumentFragment();
        for (var m = 0; m < MAX_SIMILAR_PIN_COUNT; m++) {
          var currentPin = window.renderPin(offers[m]);
          fragment.appendChild(currentPin);
          onCardClick(currentPin, offers[m]);
        }
        pinsList.appendChild(fragment);
      };

      var onError = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      };

      window.load(onSuccess, onError);

      window.addressInput.value = (Number.parseInt(window.pinMain.style.left, 10) + window.PIN_WIDTH / 2) + ', ' + (Number.parseInt(window.pinMain.style.top, 10) + window.PIN_HEIGHT);
      window.pinMain.removeEventListener('mousedown', onButtonClick);
      window.pinMain.removeEventListener('keydown', onButtonClick);
    }
  };

  window.pinMain.addEventListener('mousedown', onButtonClick);
  window.pinMain.addEventListener('keydown', onButtonClick);
})();
