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
      var activePin = window.utils.pinsList.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
        window.utils.pinsList.removeChild(window.utils.pinsList.querySelector('.map__card'));
      }

      pin.classList.add('map__pin--active');
      window.utils.pinsList.appendChild(window.renderCard(offer));

      var card = window.utils.pinsList.querySelector('.map__card');
      var closeButton = card.querySelector('.popup__close');

      closeButton.addEventListener('click', function () {
        window.utils.pinsList.removeChild(window.utils.pinsList.querySelector('.map__card'));
        pin.classList.remove('map__pin--active');
      });

      document.addEventListener('keydown', function (e) {
        if (e.keyCode === window.utils.ESC && window.utils.pinsList.querySelector('.map__pin--active') && window.utils.pinsList.querySelector('.map__card')) {
          window.utils.pinsList.querySelector('.map__pin--active').classList.remove('map__pin--active');
          window.utils.pinsList.removeChild(window.utils.pinsList.querySelector('.map__card'));
        }
      });
    });
  };

  var checkFeature = function (filter, feature, offerItem) {
    var isSimilar = true;
    if (filter.checked && offerItem.offer.features.indexOf(feature) < 0) {
      isSimilar = false;
    }
    return isSimilar;
  };

  var checkPrice = function (offerItem) {
    var isSimilar = false;
    switch (priceFilter.value) {
      case 'any':
        isSimilar = true;
        break;
      case 'middle':
        if (offerItem.offer.price >= 10000 && offerItem.offer.price <= 50000) {
          isSimilar = true;
        }
        break;
      case 'low':
        if (offerItem.offer.price < 10000) {
          isSimilar = true;
        }
        break;
      case 'high':
        if (offerItem.offer.price > 50000) {
          isSimilar = true;
        }
        break;
      default:
        break;
    }
    return isSimilar;
  };

  var checkFilters = function (offers) {
    var similars = [];
    var takeNumber = offers.length > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : offers.length;

    for (var i = 0, count = 0; i < offers.length && count < takeNumber; i++) {
      var offerItem = offers[i];
      if (typeFilter.value !== 'any' && offerItem.offer.type !== typeFilter.value) {
        continue;
      }
      if (roomsFilter.value !== 'any' && offerItem.offer.rooms !== parseInt(roomsFilter.value, 10)) {
        continue;
      }
      if (guestsFilter.value !== 'any' && offerItem.offer.guests !== parseInt(guestsFilter.value, 10)) {
        continue;
      }
      if (!checkPrice(offerItem)) {
        continue;
      }
      if (!checkFeature(wifiFilter, 'wifi', offerItem)) {
        continue;
      }
      if (!checkFeature(dishwasherFilter, 'dishwasher', offerItem)) {
        continue;
      }
      if (!checkFeature(parkingFilter, 'parking', offerItem)) {
        continue;
      }
      if (!checkFeature(washerFilter, 'washer', offerItem)) {
        continue;
      }
      if (!checkFeature(elevatorFilter, 'elevator', offerItem)) {
        continue;
      }
      if (!checkFeature(conditionerFilter, 'conditioner', offerItem)) {
        continue;
      }
      similars.push(offerItem);
      count++;
    }
    return similars;
  };

  var updatePins = function (offers) {
    var pins = window.utils.pinsList.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      window.utils.pinsList.removeChild(pins[i]);
    }

    var similars = checkFilters(offers);
    var takeNumber = similars.length > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : similars.length;

    for (var j = 0; j < takeNumber; j++) {
      var currentPin = window.renderPin(similars[j]);
      window.utils.pinsList.appendChild(currentPin);
      onPinClick(currentPin, similars[j]);
    }
  };

  var onLoad = function (data) {
    var offers = data;
    window.debounce(updatePins(offers));
  };

  var onFilterChange = function () {
    if (window.utils.pinsList.querySelector('.map__card')) {
      window.utils.pinsList.removeChild(window.utils.pinsList.querySelector('.map__card'));
    }
    window.backend.load(onLoad, window.utils.onLoadError);
  };

  window.filter = {
    onLoad: onLoad,
    onFilterChange: onFilterChange,
  };
})();
