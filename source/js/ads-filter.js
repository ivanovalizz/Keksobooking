const COUNT_OF_SIMILAR_ADS = 10
const HOUSING_PRICE = {
  low: {
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
  },
}

const mapFiltersFormElement = document.querySelector('.map__filters')
const selectHousingTypeElement = mapFiltersFormElement.querySelector('#housing-type')
const selectHousingPriceElement = mapFiltersFormElement.querySelector('#housing-price')
const selectHousingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms')
const selectHousingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests')
const featuresElements = mapFiltersFormElement.querySelectorAll('input[name="features"]')

const checkType = ad => {
  const type = selectHousingTypeElement.value
  return type === 'any' || ad.offer.type === type
}

const checkPrice = ad => {
  const price = selectHousingPriceElement.value
  return price === 'any' ||
    (HOUSING_PRICE[price].max === undefined || HOUSING_PRICE[price].max !== undefined && ad.offer.price <= HOUSING_PRICE[price].max) &&
    (HOUSING_PRICE[price].min === undefined || HOUSING_PRICE[price].min !== undefined && ad.offer.price >= HOUSING_PRICE[price].min)
}

const checkRooms = ad => {
  const rooms = selectHousingRoomsElement.value
  return rooms === 'any' || ad.offer.rooms === Number(rooms)
}

const checkGuests = ad => {
  const guests = selectHousingGuestsElement.value
  return guests === 'any' || ad.offer.guests === Number(guests)
}

const checkFeatures = ad => Array.from(featuresElements).every(feature => !feature.checked || ad.offer.features.indexOf(feature.value) !== -1)

const checkSimilarForFilters = ad => {
  const type = checkType(ad)
  const price = checkPrice(ad)
  const rooms = checkRooms(ad)
  const guests = checkGuests(ad)
  const features = checkFeatures(ad)

  return type && price && rooms && guests && features
}

export const filterSimilarAds = ads => {
  const newArr = []
  for (let i = 0; i < ads.length; i++) {
    if (newArr.length === COUNT_OF_SIMILAR_ADS) {
      break
    }
    if (checkSimilarForFilters(ads[i])) {
      newArr.push(ads[i])
    }
  }
  return newArr
}

export const initAdsFilter = cb => {
  mapFiltersFormElement.addEventListener('reset', cb)
  selectHousingTypeElement.addEventListener('change', cb)
  selectHousingPriceElement.addEventListener('change', cb)
  selectHousingRoomsElement.addEventListener('change', cb)
  selectHousingGuestsElement.addEventListener('change', cb)
  featuresElements.forEach(feature => {
    feature.addEventListener('change', cb)
  })
}
