import {isEscEvent} from './utils.js';

const errorButtonElement = document.querySelector('.error__button');
const mainElement = document.querySelector('main');

// Функция, скрывающая модальное окно о результатах отправки формы
const hideMessageModalByEscape = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    mainElement.removeChild(document.querySelector('.notification-modal'));
  }
  document.removeEventListener('keydown', hideMessageModalByEscape);
}

const hideMessageModalByClick = () => {
  mainElement.removeChild(document.querySelector('.notification-modal'));
  document.querySelector('.notification-modal').removeEventListener('click', hideMessageModalByClick);
  if (errorButtonElement) {
    errorButtonElement.removeEventListener('click', hideMessageModalByClick);
  }
}

// Функция, отображающая модальное окно о результатах отправки формы
export const showMessageModal = (elementId) => {
  const template = document.querySelector(`#${elementId}`).content.querySelector('div');
  const messageModal = template.cloneNode(true);
  messageModal.classList.add('notification-modal');
  mainElement.appendChild(messageModal);
  document.addEventListener('keydown', hideMessageModalByEscape);
  document.querySelector('.notification-modal').addEventListener('click', hideMessageModalByClick);

  if (errorButtonElement) {
    errorButtonElement.addEventListener('click', hideMessageModalByClick);
  }
}
