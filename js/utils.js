'use strict';

(function () {
  window.PIN_MAIN_SIZE = 65;
  window.PIN_WIDTH = 62;
  window.PIN_HEIGHT = 84;

  window.map = document.querySelector('.map');
  window.pinMain = window.map.querySelector('.map__pin--main');
  window.form = document.querySelector('.ad-form');
  window.addressInput = document.getElementById('address');
  window.formElements = document.querySelectorAll('.ad-form__element');

  window.getCoords = function (pinCoord) {
    var coord = Math.round(Number.parseInt(pinCoord, 10) + window.PIN_MAIN_SIZE / 2);
    return coord;
  };
})();
