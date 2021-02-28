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
  if (roomNumberElement.value === '1') {
    if (capacityElement.value === '2' || capacityElement.value === '3' || capacityElement.value === '0') {
      capacityElement.setCustomValidity('Выбранное количество комнат не подходит для такого количества гостей');
    } else {
      capacityElement.setCustomValidity('');
    }
  }
  if (roomNumberElement.value === '2') {
    if (capacityElement.value === '3' || capacityElement.value === '0') {
      capacityElement.setCustomValidity('Выбранное количество комнат не подходит для такого количества гостей');
    } else {
      capacityElement.setCustomValidity('');
    }
  }
  if (roomNumberElement.value === '3') {
    if (capacityElement.value === '0') {
      capacityElement.setCustomValidity('Выбранное количество комнат подходит только для гостей');
    } else {
      capacityElement.setCustomValidity('');
    }
  }
  if (roomNumberElement.value === '100') {
    if (capacityElement.value === '1' || capacityElement.value === '2' || capacityElement.value === '3') {
      capacityElement.setCustomValidity('Выбранное количество комнат не подходит для гостей');
    } else {
      capacityElement.setCustomValidity('');
    }
  }

  capacityElement.reportValidity();
}

roomNumberElement.addEventListener('change', onRoomNumberAndCapacitySelectChange)
capacityElement.addEventListener('change', onRoomNumberAndCapacitySelectChange)
