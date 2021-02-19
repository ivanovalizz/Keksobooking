import {fetchAds} from './mocks.js';

const COUNT_OF_ADS = 10;
const OFFER_TYPE_DICTIONARY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const setElementParam = function (element, value, param = 'textContent') {
  if (!value) {
    element.style.display = 'none';
  } else {
    element[param] = value;
  }
}

// Создание DOM-элементов фотографий для объявления
const createPhotosFragment = function (cardElement, photos) {
  const imageTemplate = cardElement.querySelector('.popup__photos').querySelector('img');
  const imagesFragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const img = imageTemplate.cloneNode(true);
    img.src = photos[i];
    imagesFragment.appendChild(img);
  }

  return imagesFragment;
}

// Функция, создающая DOM-элементы на основе сгенерированных объектов
const createCardsFragment = function () {
  const ads = fetchAds(COUNT_OF_ADS);
  const template = document.querySelector('#card').content.querySelector('article');
  const fragment = document.createDocumentFragment();

  ads.forEach(ad => {
    const cardElement = template.cloneNode(true);

    setElementParam(cardElement.querySelector('.popup__title'), ad.offer.title);
    setElementParam(cardElement.querySelector('.popup__text--address'), ad.offer.address);
    setElementParam(cardElement.querySelector('.popup__text--price'),`${ad.offer.price} ₽/ночь`);
    setElementParam(cardElement.querySelector('.popup__type'), OFFER_TYPE_DICTIONARY[ad.offer.type]);
    setElementParam(cardElement.querySelector('.popup__text--capacity'), `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);
    setElementParam(cardElement.querySelector('.popup__text--time'), `Заезд после  ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`);
    setElementParam(cardElement.querySelector('.popup__features'), ad.offer.features.join(', '));
    setElementParam(cardElement.querySelector('.popup__description'), ad.offer.description);
    setElementParam(cardElement.querySelector('.popup__avatar'), ad.author.avatar, 'src');

    const photosElement = cardElement.querySelector('.popup__photos');
    const imagesFragment = createPhotosFragment(cardElement, ad.offer.photos);

    photosElement.innerHTML = '';
    photosElement.appendChild(imagesFragment);

    fragment.appendChild(cardElement);
  });
  return fragment;
}

const cardsFragment = createCardsFragment();

// Функция, отрисовывающая первую карточку с объявлением
export const renderCard = function () {
  document.querySelector('#map-canvas').appendChild(cardsFragment.firstElementChild);
}
