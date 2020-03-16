'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.renderPin = function (offerItem) {
    if (offerItem.offer) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinAvatar = pinElement.querySelector('img');
      pinAvatar.src = offerItem.author.avatar;
      pinAvatar.alt = offerItem.offer.title;
      pinElement.style.left = offerItem.location.x - window.PIN_WIDTH / 2 + 'px';
      pinElement.style.top = offerItem.location.y - window.PIN_HEIGHT + 'px';
    }

    return pinElement;
  };
})();
