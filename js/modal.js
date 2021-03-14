import {isEscEvent} from './utils.js';

// Функция, скрывающая модальное окно о результатах отправки формы
const hideMessageModalByEscape = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.querySelector('main').removeChild(document.querySelector('.notification-modal'));
  }
  document.removeEventListener('keydown', hideMessageModalByEscape);
}

const hideMessageModalByClick = function () {
  document.querySelector('main').removeChild(document.querySelector('.notification-modal'));
  document.querySelector('.notification-modal').removeEventListener('click', hideMessageModalByClick);
  if (document.querySelector('.error__button')) {
    document.querySelector('.error__button').removeEventListener('click', hideMessageModalByClick);
  }
}

// Функция, отображающая модальное окно о результатах отправки формы
export const showMessageModal = function (elementId) {
  const template = document.querySelector(`#${elementId}`).content.querySelector('div');
  const messageModal = template.cloneNode(true);
  messageModal.classList.add('notification-modal');
  document.querySelector('main').appendChild(messageModal);
  document.addEventListener('keydown', hideMessageModalByEscape);
  document.querySelector('.notification-modal').addEventListener('click', hideMessageModalByClick);

  if (document.querySelector('.error__button')) {
    document.querySelector('.error__button').addEventListener('click', hideMessageModalByClick);
  }
}
