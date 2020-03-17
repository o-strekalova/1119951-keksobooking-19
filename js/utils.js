'use strict';

(function () {
  var PIN_MAIN_SIZE = 65;

  window.ESC = 27;
  window.PIN_WIDTH = 62;
  window.PIN_HEIGHT = 84;

  window.pinsList = document.querySelector('.map__pins');
  window.pinMain = window.pinsList.querySelector('.map__pin--main');
  window.addressInput = document.getElementById('address');

  var getCoords = function (pinCoord) {
    return Math.round(Number.parseInt(pinCoord, 10) + PIN_MAIN_SIZE / 2);
  };

  window.getAddress = function () {
    return getCoords(window.pinMain.style.left) + ', ' + getCoords(window.pinMain.style.top);
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
