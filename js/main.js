import {setUserFormSubmit, onMapFiltersChange} from './form.js';
import {fetchSimilarAds} from './api.js';
import {renderSimilarPoints} from './map.js';

// const SIMILAR_ADS_COUNT = 10;

fetchSimilarAds(
  (data) => {
    renderSimilarPoints(data)
    onMapFiltersChange(() => renderSimilarPoints(data))
  },
  (errorMessage) => alert(errorMessage),
)

setUserFormSubmit();
