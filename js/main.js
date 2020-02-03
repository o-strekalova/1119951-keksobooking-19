'use strict'

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


var getOffers = function (number, types, times, feautures, photos) {
  var offers = [];

  for (var i = 1; i < number + 1; i++) {
    var offersItem = {};

    offersItem.author = {};
    offersItem.author.avatar = 'img/avatars/user0' + i + '.png';

    offersItem.location = {};
    offersItem.location.x = getRandomInt(0, width + 1);
    offersItem.location.y = getRandomInt(130, 630);

    offersItem.offer = {};
    offersItem.offer.title = '';
    offersItem.offer.address = location.x + ', ' + location.y;
    offersItem.offer.price = getRandomInt(1, any) * 1000;
    offersItem.offer.type = types[getRandomInt(0, 4)];
    offersItem.offer.rooms = getRandomInt(1, 11);
    offersItem.offer.guests = getRandomInt(1, 101);
    offersItem.offer.checkin = times[getRandomInt(0, 3)];
    offersItem.offer.checkout = times[getRandomInt(0, 3)];

    for (var ii = 0; ii < getRandomInt(1, feautures.length + 1); ii++) {
      offersItem.offer.feautures = [];
      offersItem.offer.features[ii] = feautures[ii];
    }

    offersItem.offer.description = '';

    for (var iii = 0; iii < getRandomInt(2, any); iii++) {
      offersItem.offer.photos = [];
      offersItem.offer.photos[iii] = photos[iii];
    }

    offers[i] = offersItem;
  }

  return offers;
};

var offersArray = getOffers(8, TYPES, TIMES, FEATURES, PHOTOS);

var cardTemplate = document.getElementById('popup');

var renderCard = function (offerItem) {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar') = offerItem.author.avatar;
  card.querySelector('.popup__title').textContent = offerItem.offer.title;
  card.querySelector('.popup__text--address').textContent = offerItem.offer.address;
  card.querySelector('.popup__text--price').textContent = offerItem.offer.price + ' /ночь';
  card.querySelector('.popup__type').textContent = offerItem.offer.type;
  card.querySelector('.popup__text--capacity').textContent = offerItem.offer.rooms + 'комнаты для ' + offerItem.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  card.querySelector('.popup__features') = offerItem.offer.feautures;
  card.querySelector('.popup__description').textContent = offerItem.offer.description;
  card.querySelector('.popup__photos') = offerItem.offer.photos;

  return card;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < offersArray.length; i++) {
  fragment.appendChild(renderCard(offersArray[i]));
}
map.appendChild(fragment);


/*<template id="card">
<article class="map__card popup">
  <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
  <button type="button" class="popup__close">Закрыть</button>
  <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
  <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
  <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
  <h4 class="popup__type">Квартира</h4>
  <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
  <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
  <ul class="popup__features">
    <li class="popup__feature popup__feature--wifi"></li>
    <li class="popup__feature popup__feature--dishwasher"></li>
    <li class="popup__feature popup__feature--parking"></li>
    <li class="popup__feature popup__feature--washer"></li>
    <li class="popup__feature popup__feature--elevator"></li>
    <li class="popup__feature popup__feature--conditioner"></li>
  </ul>
  <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
  <div class="popup__photos">
    <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
  </div>
</article>
</template>*/

/*{
  'author': {
  'avatar': строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
'offer': {
'title': строка, заголовок предложения
'address': строка, адрес предложения. Для простоты пусть пока представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
'price': число, стоимость
'type': строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
'rooms': число, количество комнат
'guests': число, количество гостей, которое можно разместить
'checkin': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
'checkout': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
'features': массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
'description': строка с описанием,
'photos': массив строк случайной длины, содержащий адреса фотографий 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
},

'location': {
'x': случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
'y': случайное число, координата y метки на карте от 130 до 630.
}
}*/
