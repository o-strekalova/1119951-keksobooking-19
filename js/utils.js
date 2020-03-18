'use strict';

(function () {
  var PIN_MAIN_SIZE = 65;

  var ESC = 27;
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;

  var pinsList = document.querySelector('.map__pins');
  var pinMain = pinsList.querySelector('.map__pin--main');
  var addressInput = document.getElementById('address');

  var getCoords = function (pinCoord) {
    return Math.round(Number.parseInt(pinCoord, 10) + PIN_MAIN_SIZE / 2);
  };

  var getAddress = function () {
    return getCoords(pinMain.style.left) + ', ' + getCoords(pinMain.style.top);
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

  window.utils = {
    ESC: ESC,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    pinsList: pinsList,
    pinMain: pinMain,
    addressInput: addressInput,
    getCoords: getCoords,
    getAddress: getAddress,
    onLoadError: onLoadError,
  };
})();
