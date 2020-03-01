'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.renderCard = function (offerItem) {
    var cardElement = cardTemplate.cloneNode(true);

    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--time');
    var time = cardElement.querySelector('.popup__text--capacity');
    var features = cardElement.querySelector('.popup__features');
    var feature = features.querySelector('.popup__feature');
    var description = cardElement.querySelector('.popup__description');
    var photos = cardElement.querySelector('.popup__photos');
    var photo = photos.querySelector('.popup__photo');
    var avatar = cardElement.querySelector('.popup__avatar');

    title.textContent = offerItem.offer.title;
    address.textContent = offerItem.offer.address;

    if (offerItem.offer.price) {
      price.textContent = offerItem.offer.price + '₽/ночь';
    }

    switch (offerItem.offer.type) {
      case 'flat':
        type.textContent = 'Квартира';
        break;
      case 'bungalo':
        type.textContent = 'Бунгало';
        break;
      case 'house':
        type.textContent = 'Дом';
        break;
      case 'palace':
        type.textContent = 'Дворец';
        break;
      default:
        type.textContent = 'Неизвестная постройка';
    }

    if (offerItem.offer.rooms) {
      capacity.textContent = offerItem.offer.rooms + ' комнаты';
    }

    if (offerItem.offer.guests) {
      capacity.textContent += ' для ' + offerItem.offer.guests + ' гостей';
    }

    if (offerItem.offer.checkin) {
      time.textContent = 'Заезд после ' + offerItem.offer.checkin;
    }

    if (offerItem.offer.checkout) {
      time.textContent += ', выезд до ' + offerItem.offer.checkout;
    }

    for (var i = 0; i < offerItem.offer.features.length; i++) {
      features.appendChild(feature);
      feature.classList.add('popup__feature--' + offerItem.offer.features[i]);
    }

    description.textContent = offerItem.offer.description;

    for (var j = 0; j < offerItem.offer.photos.length; j++) {
      photos.appendChild(photo);
      photo.src = offerItem.offer.photos[j];
    }

    avatar.src = offerItem.author.avatar;

    return cardElement;
  };

})();
