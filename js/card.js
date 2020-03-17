'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

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
    var description = cardElement.querySelector('.popup__description');
    var photos = cardElement.querySelector('.popup__photos');
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

    features.innerHTML = '';
    var fragmentFeatures = document.createDocumentFragment();
    for (var i = 0; i < offerItem.offer.features.length; i++) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add('popup__feature--' + offerItem.offer.features[i]);
      fragmentFeatures.appendChild(newFeature);
    }
    features.appendChild(fragmentFeatures);

    description.textContent = offerItem.offer.description;

    photos.innerHTML = '';
    var fragmentPhotos = document.createDocumentFragment();
    for (var j = 0; j < offerItem.offer.photos.length; j++) {
      var newPhoto = document.createElement('img');
      newPhoto.classList.add('popup__photo');
      newPhoto.width = PHOTO_WIDTH;
      newPhoto.height = PHOTO_HEIGHT;
      newPhoto.alt = 'Фотография жилья';
      newPhoto.src = offerItem.offer.photos[j];
      fragmentPhotos.appendChild(newPhoto);
    }
    photos.appendChild(fragmentPhotos);

    avatar.src = offerItem.author.avatar;

    return cardElement;
  };
})();
