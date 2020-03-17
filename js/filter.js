'use strict';

(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;

  var typeFilter = document.getElementById('housing-type');
  var priceFilter = document.getElementById('housing-price');
  var roomsFilter = document.getElementById('housing-rooms');
  var guestsFilter = document.getElementById('housing-guests');
  var wifiFilter = document.getElementById('filter-wifi');
  var dishwasherFilter = document.getElementById('filter-dishwasher');
  var parkingFilter = document.getElementById('filter-parking');
  var washerFilter = document.getElementById('filter-washer');
  var elevatorFilter = document.getElementById('filter-elevator');
  var conditionerFilter = document.getElementById('filter-conditioner');

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
        if (e.keyCode === window.ESC && window.pinsList.querySelector('.map__pin--active') && window.pinsList.querySelector('.map__card')) {
          window.pinsList.querySelector('.map__pin--active').classList.remove('map__pin--active');
          window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
        }
      });

      pin.removeEventListener('click', window.onPinClick);
    });
  };

  var checkFilters = function (offers) {
    var similars = offers;

    if (typeFilter.value !== 'any') {
      similars = similars.filter(function (offerItem) {
        return offerItem.offer.type === typeFilter.value;
      });
    }

    switch (priceFilter.value) {
      case 'any':
        break;
      case 'middle':
        similars = similars.filter(function (offerItem) {
          return offerItem.offer.price >= 10000 && offerItem.offer.price <= 50000;
        });
        break;
      case 'low':
        similars = similars.filter(function (offerItem) {
          return offerItem.offer.price < 10000;
        });
        break;
      case 'high':
        similars = similars.filter(function (offerItem) {
          return offerItem.offer.price > 50000;
        });
        break;
      default:
        break;
    }

    if (roomsFilter.value !== 'any') {
      similars = similars.filter(function (offerItem) {
        return offerItem.offer.rooms === parseInt(roomsFilter.value, 10);
      });
    }

    if (guestsFilter.value !== 'any') {
      similars = similars.filter(function (offerItem) {
        return offerItem.offer.guests === parseInt(guestsFilter.value, 10);
      });
    }

    var checkFeature = function (filter, feature) {
      if (filter.checked) {
        similars = similars.filter(function (offerItem) {
          return offerItem.offer.features.indexOf(feature) > -1;
        });
      }
    };

    checkFeature(wifiFilter, 'wifi');
    checkFeature(dishwasherFilter, 'dishwasher');
    checkFeature(parkingFilter, 'parking');
    checkFeature(washerFilter, 'washer');
    checkFeature(elevatorFilter, 'elevator');
    checkFeature(conditionerFilter, 'conditioner');

    return similars;
  };

  var updatePins = function (offers) {
    var pins = window.pinsList.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      window.pinsList.removeChild(pins[i]);
    }

    var similars = checkFilters(offers);
    var takeNumber = similars.length > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : similars.length;

    for (var m = 0; m < takeNumber; m++) {
      var currentPin = window.renderPin(similars[m]);
      window.pinsList.appendChild(currentPin);
      onPinClick(currentPin, similars[m]);
    }
  };

  window.onLoad = function (data) {
    var offers = data;
    window.debounce(updatePins(offers));
  };

  window.onFilterChange = function () {
    if (window.pinsList.querySelector('.map__card')) {
      window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
    }
    window.load(window.onLoad, window.onLoadError);
  };
})();
