'use strict';

(function () {
  window.PIN_MAIN_SIZE = 65;
  window.PIN_WIDTH = 62;
  window.PIN_HEIGHT = 84;

  window.map = document.querySelector('.map');
  window.pinMain = window.map.querySelector('.map__pin--main');
  window.pinsList = window.map.querySelector('.map__pins');
  window.form = document.querySelector('.ad-form');
  window.addressInput = document.getElementById('address');
  window.formElements = document.querySelectorAll('.ad-form__element');
  window.avatarInput = document.getElementById('avatar');
  window.offerImagesInput = document.getElementById('images');
  window.submitButton = window.form.querySelector('.ad-form__submit');

  window.getCoords = function (pinCoord) {
    return Math.round(Number.parseInt(pinCoord, 10) + window.PIN_MAIN_SIZE / 2);
  };

  window.onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
