import {showMessageModal} from './modal.js';
import {createNewAd} from './fetchers.js';
import {mainPinMarker} from './map.js';

// Меняет значение плейсхолдера и устанавливает минимальное значение для поля с ценой
const formElement = document.querySelector('.ad-form');
const typeInputElement = formElement.querySelector('#type')
const priceInputElement = formElement.querySelector('#price');

typeInputElement.addEventListener('change', function() {
  const minPrice = {
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
  };

  priceInputElement.min = minPrice[typeInputElement.value].min;
  priceInputElement.placeholder = minPrice[typeInputElement.value].placeholder;
});

// Устанавливает сответствие между временем заселения и выезда
const checkinInputElement = formElement.querySelector('#timein');
const checkoutInputElement = formElement.querySelector('#timeout');

const onCheckinCheckoutChange = function () {
  checkinInputElement.value = this.value
  checkoutInputElement.value = this.value
}

checkinInputElement.addEventListener('change', onCheckinCheckoutChange);
checkoutInputElement.addEventListener('change', onCheckinCheckoutChange);

// Валидирует соответствие количества комнат количеству гостей
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');

const onRoomNumberAndCapacitySelectChange = function () {
  capacityElement.setCustomValidity('');

  switch (roomNumberElement.value) {
    case '1':
      if (capacityElement.value === '2' || capacityElement.value === '3' || capacityElement.value === '0') {
        capacityElement.setCustomValidity('Выбранное количество гостей не подойдёт для жилья с 1 комнатой');
      }
      break;
    case '2':
      if (capacityElement.value === '3' || capacityElement.value === '0') {
        capacityElement.setCustomValidity('Выбранное количество гостей не подойдёт для жилья с 2 комнатами');
      }
      break;
    case '3':
      if (capacityElement.value === '0') {
        capacityElement.setCustomValidity('Выбранное количество комнат подходит только для гостей');
      }
      break;
    case '100':
      if (capacityElement.value === '1' || capacityElement.value === '2' || capacityElement.value === '3') {
        capacityElement.setCustomValidity('Выбранное количество комнат не подходит для гостей');
      }
      break;
  }

  capacityElement.reportValidity();
}

roomNumberElement.addEventListener('change', onRoomNumberAndCapacitySelectChange)
capacityElement.addEventListener('change', onRoomNumberAndCapacitySelectChange)

// Меняет значения полей при сбросе формы
const BASED_LOCATION_X = 35.6895000;
const BASED_LOCATION_Y = 139.6917100;

const resetForm = () => {
  formElement.reset();
  document.querySelector('#price').placeholder = '1000';
  document.querySelector('#address').value = `${BASED_LOCATION_X.toFixed(5)}, ${BASED_LOCATION_Y.toFixed(5)}`;
  mainPinMarker.setLatLng({
    lat: BASED_LOCATION_X,
    lng: BASED_LOCATION_Y,
  });
}

document.querySelector('.ad-form__reset').addEventListener('click', resetForm);

// Отрисовывает сообщение об успешной отправке формы
const showSuccessNotification = function () {
  showMessageModal('success');
  resetForm();
}

// Отрисовывает сообщение о неудачной отправке формы
const showErrorNotification = function () {
  showMessageModal('error');
}

// Отправляет форму с новым объявлением на сервер
export const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    createNewAd(
      () => showSuccessNotification(),
      () => showErrorNotification(),
      new FormData(evt.target),
    );
  })
}
