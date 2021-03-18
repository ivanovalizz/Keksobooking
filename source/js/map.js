/* global L:readonly */
import {activateForms, deactivateForms} from './form.js'
import {getCardElement} from './card.js'
import {filterSimilarAds} from './ads-filter.js'

export const DEFAULT_MAIN_MARKER_LOCATION_X = 35.6895000
export const DEFAULT_MAIN_MARKER_LOCATION_Y = 139.6917100
export const FRACTION_DIGIT = 5
const MAP_ZOOM = 12
const MARKER_ICON_SIZE = [32, 32]
const MARKER_ICON_ANCHOR = [16, 32]
const DEFAULT_MAIN_MARKER_LOCATION = {
  lat: DEFAULT_MAIN_MARKER_LOCATION_X,
  lng: DEFAULT_MAIN_MARKER_LOCATION_Y,
}

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

const onMainPinMarkerMoveEnd = (evt) => {
  const {lat, lng} = evt.target.getLatLng()
  document.querySelector('#address').value = `${lat.toFixed(FRACTION_DIGIT)}, ${lng.toFixed(FRACTION_DIGIT)}`
}

export const initMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
  ).addTo(map)

  mainPinMarker.addTo(map)
  mainPinMarker.on('moveend', onMainPinMarkerMoveEnd)
}
