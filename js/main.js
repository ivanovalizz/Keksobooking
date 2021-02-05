
// Функция генерации случайного числа с плавающей точкой из заданного диапазона с указанным "количеством знаков после запятой"
// Источник: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
function getRandom(min, max, power) {
  // if (min < 0 || max < 0) {
  //   console.log('В заданном интервале не допустимо использование отрицательных значений!');
  //   return null;
  // }
  //
  // if (min >= max ) {
  //   console.log('В заданном интервале минимальное значение превышает максимальное!');
  //   return null;
  // }
  //
  // return (Math.random() * (max - min) + min).toFixed(power); // Максимум и минимум включаются
  //
  return min < 0 || max < 0 || min >= max ? null : (Math.random() * (max - min) + min).toFixed(power);
}

// Функция генерации случайного целого числа из заданного диапозона
function getRandomInt(min, max) {
  return getRandom(min, max, 0);
}
