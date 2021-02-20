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
