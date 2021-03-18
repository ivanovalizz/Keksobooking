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

const createPhotosFragment = (imageTemplate, photos) => {
  const imagesFragment = document.createDocumentFragment()

  for (let i = 0; i < photos.length; i++) {
    const img = imageTemplate.cloneNode(true)
    img.src = photos[i]
    imagesFragment.appendChild(img)
  }

  return imagesFragment
}

export const getCardElement = point => {
  const template = document.querySelector('#card').content.querySelector('article')
  const cardElement = template.cloneNode(true)

  setElementParam(cardElement.querySelector('.popup__title'), point.offer.title)
  setElementParam(cardElement.querySelector('.popup__text--address'), point.offer.address)
  setElementParam(cardElement.querySelector('.popup__text--price'),`${point.offer.price} ₽/ночь`)
  setElementParam(cardElement.querySelector('.popup__type'), OFFER_TYPES_DICTIONARY[point.offer.type])
  setElementParam(cardElement.querySelector('.popup__text--capacity'), `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`)
  setElementParam(cardElement.querySelector('.popup__text--time'), `Заезд после  ${point.offer.checkin}, выезд до ${point.offer.checkout}`)
  setElementParam(cardElement.querySelector('.popup__features'), point.offer.features.join(', '))
  setElementParam(cardElement.querySelector('.popup__description'), point.offer.description)
  setElementParam(cardElement.querySelector('.popup__avatar'), point.author.avatar, 'src')

  const photosElement = cardElement.querySelector('.popup__photos')
  const imagesFragment = createPhotosFragment(photosElement.querySelector('img'), point.offer.photos)

  photosElement.innerHTML = ''
  photosElement.appendChild(imagesFragment)

  return cardElement
}
