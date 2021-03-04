import {createMessageModal, showMessageModal} from './modal.js';
import {createNewAd} from './fetchers.js';

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

const checkinInputElement = formElement.querySelector('#timein');
const checkoutInputElement = formElement.querySelector('#timeout');

const onCheckinCheckoutChange = function () {
  checkinInputElement.value = this.value
  checkoutInputElement.value = this.value
}

checkinInputElement.addEventListener('change', onCheckinCheckoutChange);
checkoutInputElement.addEventListener('change', onCheckinCheckoutChange);

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

const showSuccessNotification = function () {
  const modalSuccess = createMessageModal('success');
  showMessageModal(modalSuccess);

  formElement.reset();
}

const showErrorNotification = function () {
  const modalError = createMessageModal('error');
  showMessageModal(modalError);
}

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
