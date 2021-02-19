import {getRandom, getRandomInt} from './utils.js';

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_AVAILABLE_TIME = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const MIN_LOCATION_X = 35.65000;
const MAX_LOCATION_X = 35.70000;
const MIN_LOCATION_Y = 139.70000;
const MAX_LOCATION_Y = 139.80000;
const MAX_COUNT_OF_AVATARS = 8;
const MAX_COUNT_OF_PHOTOS = 3;

// Функция, генерирующая объект локации
const getLocation = () => ({
  x: getRandom(MIN_LOCATION_X, MAX_LOCATION_X, 5),
  y: getRandom(MIN_LOCATION_Y, MAX_LOCATION_Y, 5),
})

// Функция, генерирующая случайное время въезда и выезда
const getCheckinCheckoutTime = function () {
  const index = getRandomInt(0, (OFFER_AVAILABLE_TIME.length - 1));
  return OFFER_AVAILABLE_TIME[index];
}

// Функция, генерирующая массив случайных неповторяющихмя фичей для объявления
const getFeatures = function () {
  const randomFeatures = [];
  const maxFeaturesCount = getRandomInt(0, (OFFER_FEATURES.length - 1));

  while (randomFeatures.length < maxFeaturesCount) {
    const index = getRandomInt(0, (OFFER_FEATURES.length - 1));
    const item = OFFER_FEATURES[index];

    if (randomFeatures.indexOf(item) === -1) {
      randomFeatures.push(item);
    }
  }
  return randomFeatures;
}

// Функция, генерирующая массив случайных неповторяющихся фото для объявления
const getPhotos = function () {
  const randomPhotos = [];
  const maxPhotosCount = getRandomInt(1, MAX_COUNT_OF_PHOTOS);

  for (let i = 0; i < maxPhotosCount; i++) {
    const index = maxPhotosCount !== 1 ? getRandomInt(1, maxPhotosCount) : 1;
    randomPhotos.push(`http://o0.github.io/assets/images/tokyo/hotel${index}.jpg`);
  }

  return randomPhotos;
}

// Функция, генерирующая объект с объявлением
const getAd = function () {
  const location = getLocation();
  const userAvatarIndex = getRandomInt(1, MAX_COUNT_OF_AVATARS);
  return {
    author: {
      avatar: `img/avatars/user0${userAvatarIndex}.png`,
    },
    offer: {
      title: 'The title of ad',
      address: `${location.x}, ${location.y}`,
      price: getRandomInt(0, 100000),
      type: OFFER_TYPES[getRandomInt(0, (OFFER_TYPES.length - 1))],
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
