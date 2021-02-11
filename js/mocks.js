import {getRandom, getRandomInt} from './utils.js';

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
  const index = getRandomInt(0, (offerCheckinCheckoutArray.length - 1));
  return offerCheckinCheckoutArray[index];
}

// Функция, генерирующая массив случайных неповторяющихмя фичей для объявления
function getFeatures() {
  const randomFeatures = [];
  const maxFeaturesCount = getRandomInt(0, (offerFeaturesArray.length - 1));

  while (randomFeatures.length < maxFeaturesCount) {
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
    const index = getRandomInt(1, maxCountOfPhotos);
    randomPhotos.push(`http://o0.github.io/assets/images/tokyo/hotel${index}.jpg`);
  }

  return randomPhotos;
}

// Функция, генерирующая объект с объявлением
function getAd() {
  const location = getLocation();
  const userAvatarIndex = getRandomInt(1, maxCountOfAvatar);
  return {
    author: {
      avatar: `img/avatars/user0${userAvatarIndex}.png`,
    },
    offer: {
      title: 'The title of ad',
      address: `${location.x}, ${location.y}`,
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
    location,
  }
}

// Функция создания массива из 10 сгенерированных объектов случайных объявлений
export const fetchAds = function (count) {
  const randomAds = []; // Пустой массив, в который сложим сгенерированные объекты

  for (let i = 0; i < count; i++) {
    randomAds.push(getAd())
  }

  return randomAds;
}
