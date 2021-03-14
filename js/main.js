import {setUserFormSubmit} from './form.js';
import {fetchSimilarAds} from './fetchers.js';
import {renderPoints} from './map.js';

const SIMILAR_ADS_COUNT = 10;

fetchSimilarAds(
  (data) => renderPoints(data.slice(0, SIMILAR_ADS_COUNT)),
  (errorMessage) => alert(errorMessage),
)

setUserFormSubmit();
