'use strict';

var TITLES = ['Уютное гнездышко для молодоженов', 'Квартира с завораживающим видом на море', 'NEW Fancy-студия на 4 человека (Я.Фабрициуса)', 'Квартира у моря (500м) Дом Бизнес Класса в Центре'];
var DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Квартира с панорамным видом на море!!! В 10-15 мин. ходьбы море и набережная по уютным и тихим улочка. Во дворе дома детская площадка и магазин Пятерочка. Евродвушка: спальня с широкой кроватью и шкафом, кухня-гостиная с диваном-кроватью телевизором. В квартире есть все для комфортного и уютного проживания: посуда, микроволновка, электрочайник, гладильная доска, утюг, фен, стиральная машина, кондиционер! Ждем вас в гости!', 'Светлая, уютная квартира в новом доме (ЖК Романовский ). До моря 10-15 минут пешком, чистый пляж СантаБарбара. На закрытой территории комплекса находится детская площадка, мини маркет, парикмахерская, кафе.', 'Новая уютная квартира-студия с хорошим ремонтом в доме бизнес-класса рядом с санаторием Золотой колос. Прекрасный вид из панорамных окон. До пляжа 800м. Тихий район рядом с Сочинским дендрарием, и, при этом, совсем недалеко - прогулочная зона Центральной набережной с множеством кафе, баров, ресторанов, Сочинским цирком, Зимним театром и др. (можно дойти пешком за 20-25 мин, или доехать на "маршрутке" за 5-8 минут - остановка рядом с домом). На первом этаже дома - магазин "Магнит".'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getOffers = function (numberOfPins) {
  var offers = [];

  for (var i = 0; i < numberOfPins; i++) {
    var offersItem = {};

    offersItem.author = {};
    offersItem.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    offersItem.location = {};
    offersItem.location.x = getRandomInt(25, 1176);
    offersItem.location.y = getRandomInt(130, 631);

    offersItem.offer = {};
    offersItem.offer.title = TITLES[getRandomInt(0, TITLES.length)];
    offersItem.offer.address = offersItem.location.x + ', ' + offersItem.location.y;
    offersItem.offer.price = getRandomInt(1, 11) * 1000;
    offersItem.offer.type = TYPES[getRandomInt(0, TYPES.length)];
    offersItem.offer.rooms = getRandomInt(1, 11);
    offersItem.offer.guests = getRandomInt(1, 101);
    offersItem.offer.checkin = TIMES[getRandomInt(0, TIMES.length)];
    offersItem.offer.checkout = TIMES[getRandomInt(0, TIMES.length)];
    offersItem.offer.features = [];

    for (var j = 0; j < getRandomInt(1, FEATURES.length); j++) {
      offersItem.offer.features[j] = FEATURES[j];
    }

    offersItem.offer.description = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)];
    offersItem.offer.photos = [];

    for (var k = 0; k < getRandomInt(1, PHOTOS.length); k++) {
      offersItem.offer.photos[k] = PHOTOS[k];
    }

    offers[i] = offersItem;
  }

  return offers;
};

var offers = getOffers(8);

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderPin = function (offerItem) {
  var pinElement = pinTemplate.cloneNode(true);

  var pinAvatar = pinElement.querySelector('img');
  pinAvatar.src = offerItem.author.avatar;
  pinAvatar.alt = offerItem.offer.title;

  pinElement.style.left = offerItem.location.x - 25 + 'px';
  pinElement.style.top = offerItem.location.y - 70 + 'px';

  return pinElement;
};

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderCard = function (offerItem) {
  var cardElement = cardTemplate.cloneNode(true);

  var title = cardElement.querySelector('.popup__title');
  title.textContent = offerItem.offer.title;

  var address = cardElement.querySelector('.popup__text--address');
  address.textContent = offerItem.offer.address;

  var price = cardElement.querySelector('.popup__text--price');
  price.textContent = offerItem.offer.price + '₽/ночь';

  var type = cardElement.querySelector('.popup__type');
  if (offerItem.offer.type === 'flat') {
    type.textContent = 'Квартира';
  } else if (offerItem.offer.type === 'bungalo') {
    type.textContent = 'Бунгало';
  } else if (offerItem.offer.type === 'house') {
    type.textContent = 'Дом';
  } else if (offerItem.offer.type === 'palace') {
    type.textContent = 'Дворец';
  }

  var capacity = cardElement.querySelector('.popup__text--time');
  capacity.textContent = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';

  var time = cardElement.querySelector('.popup__text--capacity');
  time.textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;

  var features = cardElement.querySelector('.popup__features');
  var feature = features.querySelector('.popup__feature');
  for (var i = 0; i < offerItem.offer.features.length; i++) {
    features.appendChild(feature);
    feature.classList.add('popup__feature--' + offerItem.offer.features[i]);
  }

  var description = cardElement.querySelector('.popup__description');
  description.textContent = offerItem.offer.description;

  var photos = cardElement.querySelector('.popup__photos');
  var photo = photos.querySelector('.popup__photo');
  for (var j = 0; j < offerItem.offer.photos.length; j++) {
    photos.appendChild(photo);
    photo.src = offerItem.offer.photos[j];
  }

  var avatar = cardElement.querySelector('.popup__avatar');
  avatar.src = offerItem.author.avatar;

  return cardElement;
};

var fragment = document.createDocumentFragment();
for (var m = 0; m < offers.length; m++) {
  fragment.appendChild(renderPin(offers[m]));
}
pinsList.appendChild(fragment);
pinsList.appendChild(renderCard(offers[0]));
