import {DEFAULT_MAIN_MARKER_LOCATION} from './map';

const FRACTION_DIGIT = 5

export const isEscEvent = evt => evt.key === 'Escape' || evt.key === 'Esc'
export const getAddressString = (
  lat = DEFAULT_MAIN_MARKER_LOCATION.lat,
  lng = DEFAULT_MAIN_MARKER_LOCATION.lng,
) => `${lat.toFixed(FRACTION_DIGIT)}, ${lng.toFixed(FRACTION_DIGIT)}`
