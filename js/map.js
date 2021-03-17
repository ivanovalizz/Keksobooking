/* global L:readonly */
import {getCardElement} from './card.js';

const mainFormElement = document.querySelector('.ad-form');
const mainFormFieldsetElements = mainFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersFormChildrenElements = mapFiltersFormElement.children;
const BASED_LOCATION_X = 35.6895000;
const BASED_LOCATION_Y = 139.6917100;
const MAP_ZOOM = 12;
const COUNT_OF_SIMILAR_ADS = 10;

const togglePageState = function (isNotActivated) {
  if (isNotActivated) {
    mainFormElement.classList.remove('ad-form--disabled');
    mapFiltersFormElement.classList.remove('map__filters--disabled');
    document.querySelector('#address').value = `${BASED_LOCATION_X.toFixed(5)}, ${BASED_LOCATION_Y.toFixed(5)}`;
  } else {
    mainFormElement.classList.add('ad-form--disabled');
    mapFiltersFormElement.classList.add('map__filters--disabled');
  }

  mainFormFieldsetElements.forEach(fieldset => {
    fieldset.disabled = !isNotActivated
  });

  for (let i = 0; i < mapFiltersFormChildrenElements.length; i++) {
    mapFiltersFormChildrenElements[i].disabled = !isNotActivated;
  }
}

const deactivatePage = () => togglePageState (false);
const activatePage = () => togglePageState (true);

deactivatePage();

// Добавление интерактивной карты
const map = L.map('map-canvas')
  .on('load', activatePage) // Если карта успешно загрузилась, страница переходит в активное состояние)
  .setView({lat: BASED_LOCATION_X, lng: BASED_LOCATION_Y}, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Задаёт кастомную главную метку
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const similarPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const mainPinMarker = L.marker(
  {
    lat: BASED_LOCATION_X,
    lng: BASED_LOCATION_Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// Отслеживает перемещения главной метки и выводит текущие координаты в форму поиска
mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  document.querySelector('#address').value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const filterSimilarAds = function (list) {
  return list.filter(ad => {
    const result = [];
    const type = mapFiltersFormElement.querySelector('#housing-type').value;
    if (type !== 'any') {
      result.push(ad.offer.type === type)
    }
    const price = mapFiltersFormElement.querySelector('#housing-price').value;
    if (price !== 'any') {
      if (price === 'low') {
        result.push(ad.offer.price < 10000)
      }
      if (price === 'middle') {
        result.push( ad.offer.price > 10000 && ad.offer.price < 50000)
      }
      if (price === 'high') {
        result.push(ad.offer.price > 50000)
      }
    }
    const rooms = mapFiltersFormElement.querySelector('#housing-rooms').value;
    if (rooms !== 'any') {
      result.push(ad.offer.rooms === Number(rooms))
    }
    const guests = mapFiltersFormElement.querySelector('#housing-guests').value;
    if (guests !== 'any') {
      result.push(ad.offer.guests === Number(guests))
    }
    const features = mapFiltersFormElement.querySelectorAll('input[name="features"]');
    for (let i = 0; i < features.length; i++) {
      if (features[i].checked) {
        result.push(ad.offer.features.indexOf(features[i].value) !== -1)
      }
    }
    return result.every(el => el === true);
  }).slice(0, COUNT_OF_SIMILAR_ADS);
}

// Выводит на карту метки похожих объявлений
export const renderSimilarPoints = function (ads) {
  const filteredAds = filterSimilarAds(ads)
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker && layer !== mainPinMarker) {
      map.removeLayer(layer)
    }
  })
  filteredAds.forEach((point) => {
    const similarPinMarker = L.marker(point.location, {icon: similarPinIcon});

    similarPinMarker.addTo(map).bindPopup(
      getCardElement(point),
      {keepInView: true}, // Поможет уместить всю карточку на карте, сохраняя в зоне видимости и передвигая карту
    );
  });
}
