'use strict';

(function () {
  var X_MIN = 0;
  var X_MАХ = 1200;
  var Y_MIN = 130;
  var Y_MАХ = 630;

  window.utils.pinMain.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var minTopY = Y_MIN - window.utils.PIN_HEIGHT;
      var maxTopY = Y_MАХ - window.utils.PIN_HEIGHT;
      var minLeftX = X_MIN - window.utils.PIN_WIDTH / 2;
      var maxLeftX = X_MАХ - window.utils.PIN_WIDTH / 2;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinTopY = window.utils.pinMain.offsetTop - shift.y;
      var pinLeftX = window.utils.pinMain.offsetLeft - shift.x;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinTopY > minTopY && pinTopY < maxTopY) {
        window.utils.pinMain.style.top = pinTopY + 'px';
      }
      if (pinLeftX > minLeftX && pinLeftX < maxLeftX) {
        window.utils.pinMain.style.left = pinLeftX + 'px';
      }
      window.utils.addressInput.value = (Number.parseInt(window.utils.pinMain.style.left, 10) + window.utils.PIN_WIDTH / 2) + ', ' + (Number.parseInt(window.utils.pinMain.style.top, 10) + window.utils.PIN_HEIGHT);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
