/* global _:readonly */
import {setUserFormSubmit, onMapFiltersChange} from './form.js';
import {fetchSimilarAds} from './api.js';
import {renderSimilarPoints} from './map.js';
import './photo.js';

const RERENDER_DELAY = 500;

fetchSimilarAds(
  (data) => {
    renderSimilarPoints(data)
    onMapFiltersChange(_.debounce(
      () => renderSimilarPoints(data), RERENDER_DELAY,
    ))
  },
  (errorMessage) => alert(errorMessage),
)

setUserFormSubmit();
