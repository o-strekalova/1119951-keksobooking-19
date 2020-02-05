'use strict';

var TITLES = ['Уютное гнездышко для молодоженов', 'Квартира с завораживающим видом на море', 'NEW Fancy-студия на 4 человека (Я.Фабрициуса)', 'Квартира у моря (500м) Дом Бизнес Класса в Центре'];
var DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Квартира с панорамным видом на море!!! В 10-15 мин. ходьбы море и набережная по уютным и тихим улочка. Во дворе дома детская площадка и магазин Пятерочка. Евродвушка: спальня с широкой кроватью и шкафом, кухня-гостиная с диваном-кроватью телевизором. В квартире есть все для комфортного и уютного проживания: посуда, микроволновка, электрочайник, гладильная доска, утюг, фен, стиральная машина, кондиционер! Ждем вас в гости!', 'Светлая, уютная квартира в новом доме (ЖК Романовский ). До моря 10-15 минут пешком, чистый пляж СантаБарбара. На закрытой территории комплекса находится детская площадка, мини маркет, парикмахерская, кафе.', 'Новая уютная квартира-студия с хорошим ремонтом в доме бизнес-класса рядом с санаторием Золотой колос. Прекрасный вид из панорамных окон. До пляжа 800м. Тихий район рядом с Сочинским дендрарием, и, при этом, совсем недалеко - прогулочная зона Центральной набережной с множеством кафе, баров, ресторанов, Сочинским цирком, Зимним театром и др. (можно дойти пешком за 20-25 мин, или доехать на "маршрутке" за 5-8 минут - остановка рядом с домом). На первом этаже дома - магазин "Магнит".'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var numberOfOffers = 8;

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getOffers = function () {
  var offers = [];

  for (var i = 1; i < numberOfOffers + 1; i++) {
    var offersItem = {};

    offersItem.author = {};
    offersItem.author.avatar = 'img/avatars/user0' + i + '.png';

    offersItem.location = {};
    offersItem.location.x = getRandomInt(0, 1001);
    offersItem.location.y = getRandomInt(130, 630);

    offersItem.offer = {};
    offersItem.offer.title = TITLES[getRandomInt(0, TITLES.length)];
    offersItem.offer.address = offersItem.location.x + ', ' + offersItem.location.y;
    offersItem.offer.price = getRandomInt(1, 101) * 1000;
    offersItem.offer.type = TYPES[getRandomInt(0, TYPES.length)];
    offersItem.offer.rooms = getRandomInt(1, 11);
    offersItem.offer.guests = getRandomInt(1, 101);
    offersItem.offer.checkin = TIMES[getRandomInt(0, TIMES.length)];
    offersItem.offer.checkout = TIMES[getRandomInt(0, TIMES.length)];
    offersItem.offer.features = [];

    for (var a = 0; a < getRandomInt(1, FEATURES.length + 1); a++) {
      offersItem.offer.features[a] = FEATURES[a];
    }

    offersItem.offer.description = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)];
    offersItem.offer.photos = [];

    for (var b = 0; b < getRandomInt(1, PHOTOS.length + 1); b++) {
      offersItem.offer.photos[b] = PHOTOS[b];
    }

    offers[i] = offersItem;
  }

  return offers;
};

var offers = getOffers(8);
console.log(offers);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin');

var renderPin = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = offer.location.x - 78 + 'px';
  pinElement.style.top = offer.location.y - 156 + 'px';

  var pinAvatar = pinTemplate.content.querySelector('img');
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  fragment.appendChild(renderPin(offers[i]));
}
pinsList.appendChild(fragment);
