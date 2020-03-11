'use strict';

(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;
  var filters = window.map.querySelectorAll('.map__filter');

  var onPinClick = function (pin, offer) {
    pin.addEventListener('click', function () {
      var activePin = window.pinsList.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
        window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
      }

      pin.classList.add('map__pin--active');
      window.pinsList.appendChild(window.renderCard(offer));

      var card = window.pinsList.querySelector('.map__card');
      var closeButton = card.querySelector('.popup__close');

      closeButton.addEventListener('click', function () {
        window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
        pin.classList.remove('map__pin--active');
      });

      document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27 && window.pinsList.querySelector('.map__pin--active') && window.pinsList.querySelector('.map__card')) {
          window.pinsList.querySelector('.map__pin--active').classList.remove('map__pin--active');
          window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
        }
      });

      pin.removeEventListener('click', window.onPinClick);
    });
  };

  var checkFilters = function (offers, property) {
    var similars = offers;

    for (var i = 0; i < filters.length; i++) {
      if (filters[i] !== 'any') {
        similars = offers.filter(function (offerItem) {
          return offerItem.offer[property] === filters[i].value;
        });
      }
    }
  };

  var updatePins = function (offers) {
    var pins = window.pinsList.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      window.pinsList.removeChild(pins[i]);
    }
    checkFilters(offers, )

    var takeNumber = similars.length > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : similars.length;

    for (var m = 0; m < takeNumber; m++) {
      var currentPin = window.renderPin(similars[m]);
      window.pinsList.appendChild(currentPin);
      onPinClick(currentPin, similars[m]);
    }
  };

  window.onLoad = function (data) {
    var offers = data;
    updatePins(offers);
  };

  var onFilterChange = function () {
    if (window.pinsList.querySelector('.map__card')) {
      window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
    }
    window.load(window.onLoad, window.onLoadError);
  };

  filters.forEach(function (filter) {
    filter.addEventListener('change', onFilterChange);
  });
})();
