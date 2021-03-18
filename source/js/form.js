import {showMessageModal} from './modal.js'
import {createNewAd} from './api.js'
import {DEFAULT_MAIN_MARKER_LOCATION, mainPinMarker} from './map.js'
import {getAddressString} from './utils.js';

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

const CAPACITY_LIMITS_BY_ROOMS = {
  '1': {
    maxCapacity: 1,
    errorMessage: 'Выбранное количество гостей не подойдёт для жилья с 1 комнатой',
  },
  '2': {
    maxCapacity: 2,
    errorMessage: 'Выбранное количество гостей не подойдёт для жилья с 2 комнатами',
  },
  '3': {
    maxCapacity: 3,
    errorMessage: 'Выбранное количество комнат подходит только для гостей',
  },
  '100': {
    maxCapacity: 0,
    errorMessage: 'Выбранное количество комнат не подходит для гостей',
  },
}

const formElement = document.querySelector('.ad-form')

const checkinInputElement = formElement.querySelector('#timein')
const checkoutInputElement = formElement.querySelector('#timeout')
const onCheckinCheckoutChange = evt => {
  checkinInputElement.value = evt.target.value
  checkoutInputElement.value = evt.target.value
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

  const limits = CAPACITY_LIMITS_BY_ROOMS[roomNumberElement.value]
  const capacity = Number(capacityElement.value)
  if (capacity > limits.maxCapacity || capacity === 0 && limits.maxCapacity !== 0) {
    capacityElement.setCustomValidity(limits.errorMessage)
  }
  capacityElement.reportValidity()
}

const resetButtonElement = document.querySelector('.ad-form__reset')
const mapFiltersFormElement = document.querySelector('.map__filters')
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img')
const photoPreviewElement = document.querySelector('.ad-form__photo')
const addressInputElement = document.querySelector('#address')
const onResetButtonClick = () => {
  formElement.reset()
  mapFiltersFormElement.reset()
  avatarPreviewElement.src = 'img/muffin-grey.svg'
  photoPreviewElement.style.backgroundImage = ''
  priceInputElement.placeholder = PRICE_INPUT_OPTIONS.flat.placeholder
  addressInputElement.value = getAddressString()
  mainPinMarker.setLatLng(DEFAULT_MAIN_MARKER_LOCATION)
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

const formFieldsetElements = formElement.querySelectorAll('fieldset')
const mapFiltersFormChildrenElements = mapFiltersFormElement.childNodes
const toggleFormsState = newState => {
  if (newState) {
    formElement.classList.remove('ad-form--disabled')
    mapFiltersFormElement.classList.remove('map__filters--disabled')
    addressInputElement.value = getAddressString()
  } else {
    formElement.classList.add('ad-form--disabled')
    mapFiltersFormElement.classList.add('map__filters--disabled')
  }

  formFieldsetElements.forEach(fieldset => {
    fieldset.disabled = !newState
  })

  mapFiltersFormChildrenElements.forEach(child => {
    child.disabled = !newState
  })
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



