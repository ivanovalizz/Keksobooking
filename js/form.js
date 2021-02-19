const form = document.querySelector('.ad-form');
const formTypeInput = form.querySelector('#type')
const formPriceInput = form.querySelector('#price');

formTypeInput.addEventListener('change', function() {
  if (formTypeInput.value === 'palace') {
    formPriceInput.min = '10000';
    formPriceInput.placeholder = '10000';
  } else if (formTypeInput.value === 'house') {
    formPriceInput.min = '5000';
    formPriceInput.placeholder = '5000';
  } else if (formTypeInput.value === 'flat') {
    formPriceInput.min = '1000';
    formPriceInput.placeholder = '1000';
  } else {
    formPriceInput.min = '0';
    formPriceInput.placeholder = '0';
  }
});

const formCheckinInput = form.querySelector('#timein');
const formCheckoutInput = form.querySelector('#timeout');

formCheckinInput.addEventListener('change', function () {
  if (formCheckinInput.value === '14:00') {
    formCheckoutInput.value = '14:00';
  } else if (formCheckinInput.value === '13:00') {
    formCheckoutInput.value = '13:00';
  } else if (formCheckinInput.value === '12:00') {
    formCheckoutInput.value = '12:00';
  }
});

formCheckoutInput.addEventListener('change', function () {
  if (formCheckoutInput.value === '14:00') {
    formCheckinInput.value = '14:00';
  } else if (formCheckoutInput.value === '13:00') {
    formCheckinInput.value = '13:00';
  } else if (formCheckoutInput.value === '12:00') {
    formCheckinInput.value = '12:00';
  }
});
