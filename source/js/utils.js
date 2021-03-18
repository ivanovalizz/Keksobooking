export const getRandom = (min, max, power) =>
  min >= 0 && max >= 0 && min < max ?
    Number((Math.random() * (max - min) + min).toFixed(power)) :
    null

export const getRandomInt = (min, max) => getRandom(min, max, 0)

export const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};
