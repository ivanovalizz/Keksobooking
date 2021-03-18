import {showMessageModal} from './modal.js'
import {createNewAd} from './api.js'
import {FRACTION_DIGIT, DEFAULT_MAIN_MARKER_LOCATION_X, DEFAULT_MAIN_MARKER_LOCATION_Y, mainPinMarker} from './map.js'

const PRICE_INPUT_OPTIONS = {
  palace: {
    min: '10000',
    placeholder: '10000',
  },
  house: {
    min: '5000',
    placeholder: '5000',
  },
  flat: {
    min: '1000',
    placeholder: '1000',
  },
  bungalow: {
    min: '0',
    placeholder: '0',
  },
}

const formElement = document.querySelector('.ad-form')

const checkinInputElement = formElement.querySelector('#timein')
const checkoutInputElement = formElement.querySelector('#timeout')
const onCheckinCheckoutChange = function() {
  checkinInputElement.value = this.value
  checkoutInputElement.value = this.value
}

const typeInputElement = formElement.querySelector('#type')
const priceInputElement = formElement.querySelector('#price')
const onTypeInputElementChange = () => {
  priceInputElement.min = PRICE_INPUT_OPTIONS[typeInputElement.value].min
  priceInputElement.placeholder = PRICE_INPUT_OPTIONS[typeInputElement.value].placeholder
}

const roomNumberElement = formElement.querySelector('#room_number')
const capacityElement = formElement.querySelector('#capacity')
const onRoomNumberAndCapacitySelectChange = () => {
  capacityElement.setCustomValidity('')

  switch (roomNumberElement.value) {
    case '1':
      if (capacityElement.value === '2' || capacityElement.value === '3' || capacityElement.value === '0') {
        capacityElement.setCustomValidity('Выбранное количество гостей не подойдёт для жилья с 1 комнатой')
      }
      break
    case '2':
      if (capacityElement.value === '3' || capacityElement.value === '0') {
        capacityElement.setCustomValidity('Выбранное количество гостей не подойдёт для жилья с 2 комнатами')
      }
      break
    case '3':
      if (capacityElement.value === '0') {
        capacityElement.setCustomValidity('Выбранное количество комнат подходит только для гостей')
      }
      break
    case '100':
      if (capacityElement.value === '1' || capacityElement.value === '2' || capacityElement.value === '3') {
        capacityElement.setCustomValidity('Выбранное количество комнат не подходит для гостей')
      }
      break
  }

  capacityElement.reportValidity()
}

const resetButtonElement = document.querySelector('.ad-form__reset')
const onResetButtonClick = () => {
  formElement.reset()
  document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg'
  document.querySelector('.ad-form__photo').style.backgroundImage = ''
  document.querySelector('#price').placeholder = PRICE_INPUT_OPTIONS.flat.placeholder
  document.querySelector('#address').value = `${DEFAULT_MAIN_MARKER_LOCATION_X.toFixed(FRACTION_DIGIT)}, ${DEFAULT_MAIN_MARKER_LOCATION_Y.toFixed(FRACTION_DIGIT)}`
  mainPinMarker.setLatLng({
    lat: DEFAULT_MAIN_MARKER_LOCATION_X,
    lng: DEFAULT_MAIN_MARKER_LOCATION_Y,
  })
}

const showSuccessNotification = () => {
  showMessageModal('success')
  onResetButtonClick()
}

const showErrorNotification = () => {
  showMessageModal('error')
}

const onFormSubmit = (evt) => {
  evt.preventDefault()
  createNewAd(showSuccessNotification, showErrorNotification, new FormData(evt.target))
}

const mapFiltersFormElement = document.querySelector('.map__filters')
const mapFiltersFormChildrenElements = mapFiltersFormElement.children
const toggleFormsState = newState => {
  if (newState) {
    formElement.classList.remove('ad-form--disabled')
    mapFiltersFormElement.classList.remove('map__filters--disabled')
    document.querySelector('#address').value = `${DEFAULT_MAIN_MARKER_LOCATION_X.toFixed(FRACTION_DIGIT)}, ${DEFAULT_MAIN_MARKER_LOCATION_Y.toFixed(FRACTION_DIGIT)}`
  } else {
    formElement.classList.add('ad-form--disabled')
    mapFiltersFormElement.classList.add('map__filters--disabled')
  }

  formElement.querySelectorAll('fieldset').forEach(fieldset => {
    fieldset.disabled = !newState
  })

  for (let i = 0; i < mapFiltersFormChildrenElements.length; i++) {
    mapFiltersFormChildrenElements[i].disabled = !newState
  }
}

export const deactivateForms = () => toggleFormsState(false)
export const activateForms = () => toggleFormsState(true)

export const initForm = () => {
  checkinInputElement.addEventListener('change', onCheckinCheckoutChange)
  checkoutInputElement.addEventListener('change', onCheckinCheckoutChange)
  typeInputElement.addEventListener('change', onTypeInputElementChange)
  roomNumberElement.addEventListener('change', onRoomNumberAndCapacitySelectChange)
  capacityElement.addEventListener('change', onRoomNumberAndCapacitySelectChange)
  resetButtonElement.addEventListener('click', onResetButtonClick)
  formElement.addEventListener('submit', onFormSubmit)
}


