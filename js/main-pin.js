'use strict';

(function () {
  window.pinMain.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((window.pinMain.offsetTop - shift.y) > 130 && (window.pinMain.offsetTop - shift.y) < 630) {
        window.pinMain.style.top = (window.pinMain.offsetTop - shift.y) + 'px';
      }
      window.pinMain.style.left = (window.pinMain.offsetLeft - shift.x) + 'px';
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
