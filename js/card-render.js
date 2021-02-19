import {fetchAds} from './mocks.js';

const randomCountOfAds = 10;
const offerTypeDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const template = document.querySelector('#card')
  .content
  .querySelector('article');

const fragment = document.createDocumentFragment();

function setElementParam (element, param, value) {
  if (!value) {
    element.style.display = 'none';
  } else {
    element[param] = value;
  }
}

// Отрисовка фотографий для объявления
function createPhotos (elementAd, photos) {
  const imgTemplate = elementAd.querySelector('.popup__photos')
    .querySelector('img');

  const imgFragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const img = imgTemplate.cloneNode(true);
    img.src = photos[i];
    imgFragment.appendChild(img);
  }

  elementAd.querySelector('.popup__photos').innerHTML = '';
  elementAd.querySelector('.popup__photos').appendChild(imgFragment)
}

fetchAds(randomCountOfAds).forEach((ad) => {
  const elementAd = template.cloneNode(true);

  setElementParam(elementAd.querySelector('.popup__title'), 'textContent', ad.offer.title);
  setElementParam(elementAd.querySelector('.popup__text--address'), 'textContent', ad.offer.address);
  setElementParam(elementAd.querySelector('.popup__text--price'), 'textContent', `${ad.offer.price} ₽/ночь`);
  setElementParam(elementAd.querySelector('.popup__type'), 'textContent', offerTypeDictionary[ad.offer.type]);
  setElementParam(elementAd.querySelector('.popup__text--capacity'), 'textContent', `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);
  setElementParam(elementAd.querySelector('.popup__text--time'), 'textContent', `Заезд после  ${ad.offer.checkin},  выезд до ${ad.offer.checkout}`);
  setElementParam(elementAd.querySelector('.popup__features'), 'textContent', ad.offer.features.join(', '));
  setElementParam(elementAd.querySelector('.popup__description'), 'textContent', ad.offer.description);
  setElementParam(elementAd.querySelector('.popup__avatar'), 'src', ad.author.avatar);
  createPhotos(elementAd, ad.offer.photos);

  fragment.appendChild(elementAd);
});

document.querySelector('#map-canvas').appendChild(fragment.firstElementChild);
