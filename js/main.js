import {fetchAds} from './mocks.js';

const randomCountOfAds = 10;

const template = document.querySelector('#card')
  .content
  .querySelector('article');

const fragment = document.createDocumentFragment();

fetchAds(randomCountOfAds).forEach((ad) => {
  const elementAd = template.cloneNode(true);
  elementAd.querySelector('.popup__title').textContent = ad.offer.title;
  elementAd.querySelector('.popup__text--address').textContent = ad.offer.address;
  elementAd.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
  elementAd.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  elementAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  elementAd.querySelector('.popup__features').textContent = ad.offer.features[0];
  elementAd.querySelector('.popup__description').textContent = ad.offer.description;
  elementAd.querySelector('.popup__avatar').src = ad.author.avatar;

  fragment.appendChild(elementAd);
});
console.dir(fragment)
document.querySelector('#map-canvas').appendChild(fragment.firstElementChild);

/*const elementCard = template.cloneNode(true);
const checkAnElementContainsAValue = (item, value) => !value ? item.style.display = 'none': null;*/

