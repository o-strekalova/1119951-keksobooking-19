'use strict';

(function () {
  window.pinMain.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var minTopY = 130 - window.PIN_HEIGHT;
      var maxTopY = 630 - window.PIN_HEIGHT;
      var minLeftX = 0 - window.PIN_WIDTH / 2;
      var maxLeftX = 1200 - window.PIN_WIDTH / 2;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinTopY = window.pinMain.offsetTop - shift.y;
      var pinLeftX = window.pinMain.offsetLeft - shift.x;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinTopY > minTopY && pinTopY < maxTopY) {
        window.pinMain.style.top = pinTopY + 'px';
      }
      if (pinLeftX > minLeftX && pinLeftX < maxLeftX) {
        window.pinMain.style.left = pinLeftX + 'px';
      }
      window.addressInput.value = (Number.parseInt(window.pinMain.style.left, 10) + window.PIN_WIDTH / 2) + ', ' + (Number.parseInt(window.pinMain.style.top, 10) + window.PIN_HEIGHT);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
