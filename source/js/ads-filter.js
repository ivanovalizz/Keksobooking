const COUNT_OF_SIMILAR_ADS = 10

const mapFiltersFormElement = document.querySelector('.map__filters')
const selectHousingTypeElement = mapFiltersFormElement.querySelector('#housing-type')
const selectHousingPriceElement = mapFiltersFormElement.querySelector('#housing-price')
const selectHousingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms')
const selectHousingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests')
const featuresElements = mapFiltersFormElement.querySelectorAll('input[name="features"]')

export const filterSimilarAds = ads => ads.filter(ad => {
  const results = []

  const type = selectHousingTypeElement.value
  if (type !== 'any') {
    results.push(ad.offer.type === type)
  }

  const price = selectHousingPriceElement.value
  if (price !== 'any') {
    if (price === 'low') {
      results.push(ad.offer.price < 10000)
    }
    if (price === 'middle') {
      results.push( ad.offer.price > 10000 && ad.offer.price < 50000)
    }
    if (price === 'high') {
      results.push(ad.offer.price > 50000)
    }
  }

  const rooms = selectHousingRoomsElement.value
  if (rooms !== 'any') {
    results.push(ad.offer.rooms === Number(rooms))
  }

  const guests = selectHousingGuestsElement.value
  if (guests !== 'any') {
    results.push(ad.offer.guests === Number(guests))
  }

  for (let i = 0; i < featuresElements.length; i++) {
    if (featuresElements[i].checked) {
      results.push(ad.offer.features.indexOf(featuresElements[i].value) !== -1)
    }
  }
  return results.every(el => el === true)
}).slice(0, COUNT_OF_SIMILAR_ADS)

export const initAdsFilter = cb => {
  selectHousingTypeElement.addEventListener('change', cb)
  selectHousingPriceElement.addEventListener('change', cb)
  selectHousingRoomsElement.addEventListener('change', cb)
  selectHousingGuestsElement.addEventListener('change', cb)
  for (let i = 0; i < featuresElements.length; i++) {
    featuresElements[i].addEventListener('change', cb)
  }
}
