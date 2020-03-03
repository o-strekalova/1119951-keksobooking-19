'use strict';

(function () {
  var pinsList = window.map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

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
            if (e.keyCode === 27) {
              pinsList.removeChild(pinsList.querySelector('.map__card'));
            }
          });

          pin.removeEventListener('click', onCardClick);
        });
      };

      for (var m = 0; m < window.offers.length; m++) {
        var currentPin = window.renderPin(window.offers[m]);
        fragment.appendChild(currentPin);
        onCardClick(currentPin, window.offers[m]);
      }

      pinsList.appendChild(fragment);
      window.addressInput.value = (Number.parseInt(window.pinMain.style.left, 10) + window.PIN_WIDTH / 2) + ', ' + (Number.parseInt(window.pinMain.style.top, 10) + window.PIN_HEIGHT);
      window.pinMain.removeEventListener('mousedown', onButtonClick);
      window.pinMain.removeEventListener('keydown', onButtonClick);
    }
  };

  window.pinMain.addEventListener('mousedown', onButtonClick);
  window.pinMain.addEventListener('keydown', onButtonClick);
})();
