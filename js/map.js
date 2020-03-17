'use strict';

(function () {
  var ENTER = 13;
  var LEFT_CLICK = 0;
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  var map = document.querySelector('.map');
  var filtersList = map.querySelector('.map__filters');
  var filters = filtersList.querySelectorAll('.map__filter');
  var filterCheckboxes = filtersList.querySelectorAll('.map__checkbox');

  var activate = function () {
    map.classList.remove('map--faded');
    filters.forEach(function (element) {
      element.removeAttribute('disabled', '');
    });
    filterCheckboxes.forEach(function (element) {
      element.removeAttribute('disabled', '');
    });
    window.activateFrom();

    filtersList.addEventListener('change', window.onFilterChange);
    window.load(window.onLoad, window.onLoadError);
    window.pinMain.removeEventListener('mousedown', onPinMainClick);
    window.pinMain.removeEventListener('keydown', onPinMainClick);
  };

  window.deactivate = function () {
    var pins = window.pinsList.querySelectorAll('.map__pin');
    map.classList.add('map--faded');
    window.pinMain.style.left = MAIN_PIN_LEFT + 'px';
    window.pinMain.style.top = MAIN_PIN_TOP + 'px';
    if (window.pinsList.querySelector('.map__card')) {
      window.pinsList.removeChild(window.pinsList.querySelector('.map__card'));
    }
    for (var m = 1; m < pins.length; m++) {
      window.pinsList.removeChild(pins[m]);
    }
    filters.forEach(function (element) {
      element.setAttribute('disabled', '');
      element.value = 'any';
    });
    filterCheckboxes.forEach(function (element) {
      element.setAttribute('disabled', '');
      element.checked = false;
    });
    window.deactivateForm();

    filtersList.removeEventListener('change', window.onFilterChange);
    window.pinMain.addEventListener('mousedown', onPinMainClick);
    window.pinMain.addEventListener('keydown', onPinMainClick);
  };

  var onPinMainClick = function (evt) {
    if (evt.button === LEFT_CLICK || evt.keyCode === ENTER) {
      activate();
      window.addressInput.value = (Number.parseInt(window.pinMain.style.left, 10) + window.PIN_WIDTH / 2) + ', ' + (Number.parseInt(window.pinMain.style.top, 10) + window.PIN_HEIGHT);
      window.pinMain.removeEventListener('mousedown', onPinMainClick);
      window.pinMain.removeEventListener('keydown', onPinMainClick);
    }
  };

  filters.forEach(function (element) {
    element.setAttribute('disabled', '');
  });
  filterCheckboxes.forEach(function (element) {
    element.setAttribute('disabled', '');
  });
  window.pinMain.addEventListener('mousedown', onPinMainClick);
  window.pinMain.addEventListener('keydown', onPinMainClick);
})();
