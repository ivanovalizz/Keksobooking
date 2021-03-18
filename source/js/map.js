/* global L:readonly */
import {activateForms, deactivateForms} from './form.js'
import {getCardElement} from './card.js'
import {filterSimilarAds} from './ads-filter.js'
import {getAddressString} from './utils.js';

export const DEFAULT_MAIN_MARKER_LOCATION = {
  lat: 35.6895000,
  lng: 139.6917100,
}
const MAP_ZOOM = 12
const MARKER_ICON_SIZE = [32, 32]
const MARKER_ICON_ANCHOR = [16, 32]

deactivateForms()
const map = L.map('map-canvas')
  .on('load', activateForms)
  .setView(DEFAULT_MAIN_MARKER_LOCATION, MAP_ZOOM)

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MARKER_ICON_SIZE,
  iconAnchor: MARKER_ICON_ANCHOR,
})

const similarPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: MARKER_ICON_SIZE,
  iconAnchor: MARKER_ICON_ANCHOR,
})

export const mainPinMarker = L.marker(
  DEFAULT_MAIN_MARKER_LOCATION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
)

export const renderSimilarPoints = ads => {
  const filteredAds = filterSimilarAds(ads)
  map.eachLayer(layer => {
    if (layer instanceof L.Marker && layer !== mainPinMarker) {
      map.removeLayer(layer)
    }
  })
  filteredAds.forEach(point => {
    const similarPinMarker = L.marker(point.location, {icon: similarPinIcon})
    similarPinMarker.addTo(map).bindPopup(getCardElement(point), {keepInView: true})
  })
}

const addressInputElement = document.querySelector('#address')
const onMainPinMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng()
  addressInputElement.value = getAddressString(lat, lng)
}

export const initMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
  ).addTo(map)

  mainPinMarker.addTo(map)
  mainPinMarker.on('move', onMainPinMarkerMove)
}
