const formElement = document.querySelector('.ad-form');
const typeInputElement = formElement.querySelector('#type')
const priceInputElement = formElement.querySelector('#price');

typeInputElement.addEventListener('change', function() {
  if (typeInputElement.value === 'palace') {
    priceInputElement.min = '10000';
    priceInputElement.placeholder = '10000';
  } else if (typeInputElement.value === 'house') {
    priceInputElement.min = '5000';
    priceInputElement.placeholder = '5000';
  } else if (typeInputElement.value === 'flat') {
    priceInputElement.min = '1000';
    priceInputElement.placeholder = '1000';
  } else {
    priceInputElement.min = '0';
    priceInputElement.placeholder = '0';
  }
});

const checkinInputElement = formElement.querySelector('#timein');
const checkoutInputElement = formElement.querySelector('#timeout');

const onCheckinCheckoutChange = function () {
  checkinInputElement.value = this.value
  checkoutInputElement.value = this.value
}

checkinInputElement.addEventListener('change', onCheckinCheckoutChange);
checkoutInputElement.addEventListener('change', onCheckinCheckoutChange);
