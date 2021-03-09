import {isEscEvent} from './utils.js';

// Функция, скрывающая модальное окно о результатах отправки формы
const hideMessageModal = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.querySelector('main').removeChild(document.querySelector('.notification-modal'));
  }
  document.removeEventListener('keydown', hideMessageModal);
}

// Функция, отображающая модальное окно о результатах отправки формы
export const showMessageModal = function (elementId) {
  const template = document.querySelector(`#${elementId}`).content.querySelector('div');
  const messageModal = template.cloneNode(true);
  messageModal.classList.add('notification-modal');
  document.querySelector('main').appendChild(messageModal);
  document.addEventListener('keydown', hideMessageModal);
}
