/* global _:readonly */
import {fetchSimilarAds} from './api.js'
import {initMap, renderSimilarPoints} from './map.js'
import {initForm} from './form.js'
import {initAdsFilter} from './ads-filter.js'
import './photo.js'

const RERENDER_DELAY = 500

initForm()
initMap()

fetchSimilarAds(
  data => {
    renderSimilarPoints(data)
    initAdsFilter(_.debounce(() => renderSimilarPoints(data), RERENDER_DELAY))
  },
  errorMessage => alert(errorMessage),
)
