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
    window.form.activateForm();

    filtersList.addEventListener('change', window.filter.onFilterChange);
    window.backend.load(window.filter.onLoad, window.utils.onLoadError);
    window.utils.pinMain.removeEventListener('mousedown', onPinMainClick);
    window.utils.pinMain.removeEventListener('keydown', onPinMainClick);
  };

  window.deactivate = function () {
    var pins = window.utils.pinsList.querySelectorAll('.map__pin');
    map.classList.add('map--faded');
    window.utils.pinMain.style.left = MAIN_PIN_LEFT + 'px';
    window.utils.pinMain.style.top = MAIN_PIN_TOP + 'px';
    if (window.utils.pinsList.querySelector('.map__card')) {
      window.utils.pinsList.removeChild(window.utils.pinsList.querySelector('.map__card'));
    }
    for (var i = 1; i < pins.length; i++) {
      window.utils.pinsList.removeChild(pins[i]);
    }
    filters.forEach(function (element) {
      element.setAttribute('disabled', '');
      element.value = 'any';
    });
    filterCheckboxes.forEach(function (element) {
      element.setAttribute('disabled', '');
      element.checked = false;
    });
    window.form.deactivateForm();

    filtersList.removeEventListener('change', window.filter.onFilterChange);
    window.utils.pinMain.addEventListener('mousedown', onPinMainClick);
    window.utils.pinMain.addEventListener('keydown', onPinMainClick);
  };

  var onPinMainClick = function (evt) {
    if (evt.button === LEFT_CLICK || evt.keyCode === ENTER) {
      activate();
      window.utils.addressInput.value = (Number.parseInt(window.utils.pinMain.style.left, 10) + window.utils.PIN_WIDTH / 2) + ', ' + (Number.parseInt(window.utils.pinMain.style.top, 10) + window.utils.PIN_HEIGHT);
      window.utils.pinMain.removeEventListener('mousedown', onPinMainClick);
      window.utils.pinMain.removeEventListener('keydown', onPinMainClick);
    }
  };

  filters.forEach(function (element) {
    element.setAttribute('disabled', '');
  });
  filterCheckboxes.forEach(function (element) {
    element.setAttribute('disabled', '');
  });
  window.utils.pinMain.addEventListener('mousedown', onPinMainClick);
  window.utils.pinMain.addEventListener('keydown', onPinMainClick);
})();
