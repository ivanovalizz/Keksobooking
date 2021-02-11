// Функция генерации случайного числа с плавающей точкой из заданного диапазона с указанным "количеством знаков после запятой"
// Источник: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
export const getRandom = (min, max, power) =>
  min >= 0 && max >= 0 && min < max ?
    Number((Math.random() * (max - min) + min).toFixed(power)) :
    null


// Функция генерации случайного целого числа из заданного диапозона
export const getRandomInt = (min, max) => getRandom(min, max, 0)
