// Функция генерации случайного целого числа из заданного диапазона
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
}


// Функция генерации случайного числа с плавающей точкой из заданного диапазона с указанным "количеством знаков после запятой"
// Источник: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
function getRandomnclusive(min, max, power) {
  if (min < 0 || max < 0) {
    console.log('В заданном интервале не допустимо использование отрицательных значений!')
  } else {
    if (min > max) {
      console.log('В заданном интервале минимальное значение превышает максимальное!')
    } else {
      return (Math.random() * (max - min) + min).toFixed(power); // Максимум и минимум включаются
    }
  }
}
