
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
  return min < 0 || max < 0 || min >= max ? null : Number((Math.random() * (max - min) + min).toFixed(power));
}

// Функция генерации случайного целого числа из заданного диапозона
function getRandomInt(min, max) {
  return getRandom(min, max, 0);
}

const randomCountOfAds = 10;
const offerTypeArray = ['palace', 'flat', 'house', 'bungalow'];
const offerCheckinCheckoutArray = ['12:00', '13:00', '14:00'];
const offerFeaturesArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const minLocationX = 35.65000;
const maxLocationX = 35.70000;
const minLocationY = 139.70000;
const maxLocationY = 139.80000;
const maxCountOfAvatar = 8;
const maxCountOfPhotos = 3;

// Функция, генерирующая объект локации
function getLocation() {
  return {
    x: getRandom(minLocationX, maxLocationX, 5),
    y: getRandom(minLocationY, maxLocationY, 5),
  }
}

// Функция, генерирующая случайное время въезда и выезда
function getCheckinCheckoutTime() {
  return offerCheckinCheckoutArray[getRandomInt(0, (offerCheckinCheckoutArray.length - 1))];
}

// Функция, генерирующая массив случайных неповторяющихмя фичей для объявления
function getFeatures() {
  const randomFeatures = [];
  const maxFeaturesCount = getRandomInt(0, (offerFeaturesArray.length - 1));

  while (true) {
    if (randomFeatures.length === maxFeaturesCount) {
      break;
    }

    const index = getRandomInt(0, (offerFeaturesArray.length - 1));
    const item = offerFeaturesArray[index];

    if (randomFeatures.indexOf(item) === -1) {
      randomFeatures.push(item);
    }
  }
  return randomFeatures;
}

// Функция, генерирующая массив случайных неповторяющихся фото для объявления
function getPhotos() {
  const randomPhotos = [];
  const maxPhotosCount = getRandomInt(1, 5);

  for (let i = 0; i < maxPhotosCount; i++) {
    randomPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, maxCountOfPhotos) + '.jpg');
  }

  return randomPhotos;
}

// Функция, генерирующая объект с объявлением
function getObjectAd() {
  const randomLocation = getLocation();
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, maxCountOfAvatar) + '.png',
    },
    offer: {
      title: 'The title of ad',
      address: randomLocation.x + ', ' + randomLocation.y,
      price: getRandomInt(0, 100000),
      type: getRandomInt(0, (offerTypeArray.length - 1)),
      rooms: getRandomInt(0, 100),
      guests: getRandomInt(0, 1000),
      checkin: getCheckinCheckoutTime(),
      checkout: getCheckinCheckoutTime(),
      features: getFeatures(),
      description: 'The description of ad and blah-blah-blah',
      photos: getPhotos(),
    },
    location: {
      x: randomLocation.x,
      y: randomLocation.y,
    },
  }
}

// Функция создания массива из 10 сгенерированных объектов случайных объявлений
function getAdsArray(count) {
  const randomAdsArray = []; // Пустой массив, в который сложим сгенерированные объекты

  for (let i = 0; i < randomCountOfAds; i++) {
    randomAdsArray.push(getObjectAd())
  }

  return randomAdsArray;
}

console.log(getAdsArray(randomCountOfAds));
