/*const createSuccessMessageModal = function () {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('div');
  const successMessageModal = successMessageTemplate.cloneNode(true);
  return successMessageModal;
}

const createErrorMessageModal = function () {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('div');
  const errorMessageModal = errorMessageTemplate.cloneNode(true);
  return errorMessageModal;
}*/

// Функция, создающая модальное окно с сообщением об отправке формы
export const createMessageModal = function (elementId) {
  const template = document.querySelector(`#${elementId}`).content.querySelector('div');
  const messageModal = template.cloneNode(true);
  document.querySelector('body').appendChild(messageModal);
  messageModal.classList.add('hidden');
  return messageModal;
}

// Функция, отображающая нужное модальное окно
export const showMessageModal = function (modal) {
  modal.classList.remove('hidden');
}

