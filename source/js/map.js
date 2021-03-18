/* global L:readonly */
import {getCardElement} from './card.js';
import {filterSimilarAds} from './similar-ads.js';

const BASED_LOCATION_X = 35.6895000;
const BASED_LOCATION_Y = 139.6917100;
const MAP_ZOOM = 12;

const mainFormElement = document.querySelector('.ad-form');
const mainFormFieldsetElements = mainFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersFormChildrenElements = mapFiltersFormElement.children;

const togglePageState = (isNotActivated) => {
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

// Выводит на карту метки похожих объявлений
export const renderSimilarPoints = (ads) => {
  const filteredAds = filterSimilarAds(ads)
  map.eachLayer((layer) => {
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
