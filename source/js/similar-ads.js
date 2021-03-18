const COUNT_OF_SIMILAR_ADS = 10;

const mapFiltersFormElement = document.querySelector('.map__filters');

export const filterSimilarAds = (list) => {
  return list.filter(ad => {
    const result = [];
    const type = mapFiltersFormElement.querySelector('#housing-type').value;
    if (type !== 'any') {
      result.push(ad.offer.type === type)
    }
    const price = mapFiltersFormElement.querySelector('#housing-price').value;
    if (price !== 'any') {
      if (price === 'low') {
        result.push(ad.offer.price < 10000)
      }
      if (price === 'middle') {
        result.push( ad.offer.price > 10000 && ad.offer.price < 50000)
      }
      if (price === 'high') {
        result.push(ad.offer.price > 50000)
      }
    }
    const rooms = mapFiltersFormElement.querySelector('#housing-rooms').value;
    if (rooms !== 'any') {
      result.push(ad.offer.rooms === Number(rooms))
    }
    const guests = mapFiltersFormElement.querySelector('#housing-guests').value;
    if (guests !== 'any') {
      result.push(ad.offer.guests === Number(guests))
    }
    const features = mapFiltersFormElement.querySelectorAll('input[name="features"]');
    for (let i = 0; i < features.length; i++) {
      if (features[i].checked) {
        result.push(ad.offer.features.indexOf(features[i].value) !== -1)
      }
    }
    return result.every(el => el === true);
  }).slice(0, COUNT_OF_SIMILAR_ADS);
}

export const onMapFiltersChange = (cb) => {
  document.querySelector('#housing-type').addEventListener('change', cb)
  document.querySelector('#housing-price').addEventListener('change', cb)
  document.querySelector('#housing-rooms').addEventListener('change', cb)
  document.querySelector('#housing-guests').addEventListener('change', cb)
  const features = document.querySelectorAll('input[name="features"]');
  for (let i = 0; i < features.length; i++) {
    features[i].addEventListener('change', cb)
  }
}
