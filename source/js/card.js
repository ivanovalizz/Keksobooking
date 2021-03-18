const OFFER_TYPES_DICTIONARY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
}

const setElementParam = (element, value, param = 'textContent') => {
  if (!value) {
    element.style.display = 'none'
  } else {
    element[param] = value
  }
}

const initPhotos = (photosElement, photos) => {
  const imageTemplate = photosElement.querySelector('img')
  const imagesFragment = document.createDocumentFragment()

  photos.forEach(photo => {
    const img = imageTemplate.cloneNode(true)
    img.src = photo
    imagesFragment.appendChild(img)
  })

  photosElement.innerHTML = ''
  photosElement.appendChild(imagesFragment)
}

const initFeatures = (el, features) => {
  const featuresFragment = document.createDocumentFragment()

  features.forEach(feature => {
    const template = document.createElement('li')
    template.classList.add('popup__feature')
    template.classList.add(`popup__feature--${feature}`)
    featuresFragment.appendChild(template)
  })

  el.innerHTML = ''
  el.appendChild(featuresFragment)

}

export const getCardElement = point => {
  const cardElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true)

  setElementParam(cardElement.querySelector('.popup__title'), point.offer.title)
  setElementParam(cardElement.querySelector('.popup__text--address'), point.offer.address)
  setElementParam(cardElement.querySelector('.popup__text--price'),`${point.offer.price} ₽/ночь`)
  setElementParam(cardElement.querySelector('.popup__type'), OFFER_TYPES_DICTIONARY[point.offer.type])
  setElementParam(cardElement.querySelector('.popup__text--capacity'), `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`)
  setElementParam(cardElement.querySelector('.popup__text--time'), `Заезд после  ${point.offer.checkin}, выезд до ${point.offer.checkout}`)
  setElementParam(cardElement.querySelector('.popup__description'), point.offer.description)
  setElementParam(cardElement.querySelector('.popup__avatar'), point.author.avatar, 'src')

  initFeatures(cardElement.querySelector('.popup__features'), point.offer.features)
  initPhotos(cardElement.querySelector('.popup__photos'), point.offer.photos)

  return cardElement
}
