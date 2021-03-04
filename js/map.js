/* global L:readonly */
import {getCardElement} from './card.js';

const mainFormElement = document.querySelector('.ad-form');
const mainFormFieldsetElements = mainFormElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersFormChildrenElements = mapFiltersFormElement.children;

const togglePageState = function (isNotActivated) {
  if (isNotActivated) {
    mainFormElement.classList.remove('ad-form--disabled');
    mapFiltersFormElement.classList.remove('map__filters--disabled');
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
  .setView({lat: 35.6895000, lng: 139.6917100}, 12);

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

const mainPinMarker = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100,
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
export const renderPoints = function (ads) {
  ads.forEach((point) => {
    const similarPinMarker = L.marker(point.location,
      {
        icon: similarPinIcon,
      });

    similarPinMarker.addTo(map).bindPopup(
      getCardElement(point),
      {keepInView: true}, // Поможет уместить всю карточку на карте, сохраняя в зоне видимости и передвигая карту
    );
  });
}
