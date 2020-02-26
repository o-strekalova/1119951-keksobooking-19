'use strict';

var TITLES = ['Уютное гнездышко для молодоженов', 'Квартира с завораживающим видом на море', 'NEW Fancy-студия на 4 человека (Я.Фабрициуса)', 'Квартира у моря (500м) Дом Бизнес Класса в Центре'];
var DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Квартира с панорамным видом на море!!! В 10-15 мин. ходьбы море и набережная по уютным и тихим улочка. Во дворе дома детская площадка и магазин Пятерочка. Евродвушка: спальня с широкой кроватью и шкафом, кухня-гостиная с диваном-кроватью телевизором. В квартире есть все для комфортного и уютного проживания: посуда, микроволновка, электрочайник, гладильная доска, утюг, фен, стиральная машина, кондиционер! Ждем вас в гости!', 'Светлая, уютная квартира в новом доме (ЖК Романовский ). До моря 10-15 минут пешком, чистый пляж СантаБарбара. На закрытой территории комплекса находится детская площадка, мини маркет, парикмахерская, кафе.', 'Новая уютная квартира-студия с хорошим ремонтом в доме бизнес-класса рядом с санаторием Золотой колос. Прекрасный вид из панорамных окон. До пляжа 800м. Тихий район рядом с Сочинским дендрарием, и, при этом, совсем недалеко - прогулочная зона Центральной набережной с множеством кафе, баров, ресторанов, Сочинским цирком, Зимним театром и др. (можно дойти пешком за 20-25 мин, или доехать на "маршрутке" за 5-8 минут - остановка рядом с домом). На первом этаже дома - магазин "Магнит".'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_MAIN_SIZE = 156;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var pinsList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();
var form = document.querySelector('.ad-form');
var formElements = document.querySelectorAll('.ad-form__element');
var pinMain = map.querySelector('.map__pin--main');
var addressInput = document.getElementById('address');
var roomNumberSelect = document.getElementById('room_number');
var capacitySelect = document.getElementById('capacity');
var typeSelect = document.getElementById('type');
var priceInput = document.getElementById('price');
var checkinSelect = document.getElementById('timein');
var checkoutSelect = document.getElementById('timeout');
var offerImagesInput = document.getElementById('images');
var submitButton = form.querySelector('.ad-form__submit');

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

var renderPin = function (offerItem) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinAvatar = pinElement.querySelector('img');
  pinAvatar.src = offerItem.author.avatar;
  pinAvatar.alt = offerItem.offer.title;
  pinElement.style.left = offerItem.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = offerItem.location.y - PIN_HEIGHT + 'px';

  return pinElement;
};

var renderCard = function (offerItem) {
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

for (var i = 0; i < formElements.length; i++) {
  formElements[i].setAttribute('disabled', '');
}

addressInput.value = (Number.parseInt(pinMain.style.left, 10) + PIN_MAIN_SIZE / 2) + ', ' + (Number.parseInt(pinMain.style.top, 10) + PIN_MAIN_SIZE / 2);

var onClickMapActivate = function (evt) {
  if (evt.button === 0 || evt.keyCode === 13) {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    for (var j = 0; j < formElements.length; j++) {
      formElements[j].removeAttribute('disabled', '');
    }

    var onClickCardOpen = function (pin, offer) {
      pin.addEventListener('click', function () {
        if (pinsList.querySelector('.map__card')) {
          pinsList.removeChild(pinsList.querySelector('.map__card'));
        }
        pinsList.appendChild(renderCard(offer));
        var card = pinsList.querySelector('.map__card');
        var closeButton = card.querySelector('.popup__close');

        closeButton.addEventListener('click', function () {
          pinsList.removeChild(pinsList.querySelector('.map__card'));
        });

        document.addEventListener('keydown', function (e) {
          if (e.keyCode === 27) {
            pinsList.removeChild(pinsList.querySelector('.map__card'));
          }
        });

        pin.removeEventListener('click', onClickCardOpen);
      });
    };

    for (var m = 0; m < offers.length; m++) {
      var currentPin = renderPin(offers[m]);
      fragment.appendChild(currentPin);
      onClickCardOpen(currentPin, offers[m]);
    }

    pinsList.appendChild(fragment);
    addressInput.value = (Number.parseInt(pinMain.style.left, 10) + PIN_WIDTH / 2) + ', ' + (Number.parseInt(pinMain.style.top, 10) + PIN_HEIGHT);
    pinMain.removeEventListener('mousedown', onClickMapActivate);
    pinMain.removeEventListener('keydown', onClickMapActivate);
  }
};

pinMain.addEventListener('mousedown', onClickMapActivate);
pinMain.addEventListener('keydown', onClickMapActivate);

var onClickSubmitCheckValidity = function (e) {
  var capacityMessage = '';
  var minPriceMessage = '';
  var checkoutMessage = '';

  if (roomNumberSelect.value === '1' && capacitySelect.value !== '1') {
    capacityMessage = '1 комната = 1 гость';
  } else if (roomNumberSelect.value === '2' && capacitySelect.value !== '1' && capacitySelect.value !== '2') {
    capacityMessage = '2 комнаты = 1 гость или 2 гостя';
  } else if (roomNumberSelect.value === '3' && capacitySelect.value === '0') {
    capacityMessage = '3 комнаты = 1 гость, 2 гостя или 3 гостя';
  } else if (roomNumberSelect.value === '100' && capacitySelect.value !== '0') {
    capacityMessage = '100 комнат = не для гостей';
  }

  capacitySelect.setCustomValidity(capacityMessage);

  if (typeSelect.value === 'flat' && priceInput.value < 1000) {
    minPriceMessage = 'Квартиры от 1 000₽/ночь';
  } else if (typeSelect.value === 'house' && priceInput.value < 5000) {
    minPriceMessage = 'Дома от 5 000₽/ночь';
  } else if (typeSelect.value === 'palace' && priceInput.value < 10000) {
    minPriceMessage = 'Дворец от 10 000₽/ночь';
  }

  priceInput.setCustomValidity(minPriceMessage);

  if (checkinSelect.value !== checkoutSelect.value) {
    checkoutMessage = 'Время заезда и выезда должно совпадать';
  }

  checkoutSelect.setCustomValidity(checkoutMessage);

  e.preventDefault();
  for (var q = 0; q < offerImagesInput.files.length; q++) {
    if (offerImagesInput.files[q].type !== 'image/png') {
      console.log(offerImagesInput.files[q].type);
    }
  }
};

submitButton.addEventListener('click', onClickSubmitCheckValidity);

typeSelect.addEventListener('change', function () {
  if (typeSelect.value === 'bungalo') {
    priceInput.setAttribute('placeholder', '0');
    priceInput.setAttribute('value', 0);
  } else if (typeSelect.value === 'flat') {
    priceInput.setAttribute('placeholder', '1000');
    priceInput.setAttribute('value', 1000);
  } else if (typeSelect.value === 'house') {
    priceInput.setAttribute('placeholder', '5000');
    priceInput.setAttribute('value', 5000);
  } else if (typeSelect.value === 'palace') {
    priceInput.setAttribute('placeholder', '10000');
    priceInput.setAttribute('value', 10000);
  }
});

checkoutSelect.addEventListener('change', function () {
  checkinSelect.value = checkoutSelect.value;
});

checkinSelect.addEventListener('change', function () {
  checkoutSelect.value = checkinSelect.value;
});
