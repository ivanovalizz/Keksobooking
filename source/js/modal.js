import {isEscEvent} from './utils.js'

const mainElement = document.querySelector('main')
const hideMessageModalByEscape = evt => {
  if (isEscEvent(evt)) {
    evt.preventDefault()
    mainElement.removeChild(document.querySelector('.notification-modal'))
  }
  document.removeEventListener('keydown', hideMessageModalByEscape)
}

const hideMessageModalByClick = () => {
  const errorButtonElement = document.querySelector('.error__button')
  const notificationModalElement = document.querySelector('.notification-modal')

  notificationModalElement.removeEventListener('click', hideMessageModalByClick)
  mainElement.removeChild(notificationModalElement)

  if (errorButtonElement) {
    errorButtonElement.removeEventListener('click', hideMessageModalByClick)
  }
}

export const showMessageModal = elementId => {
  const errorButtonElement = document.querySelector('.error__button')
  const template = document.querySelector(`#${elementId}`).content.querySelector('div')

  const messageModal = template.cloneNode(true)
  messageModal.classList.add('notification-modal')
  mainElement.appendChild(messageModal)
  document.addEventListener('keydown', hideMessageModalByEscape)
  document.querySelector('.notification-modal').addEventListener('click', hideMessageModalByClick)

  if (errorButtonElement) {
    errorButtonElement.addEventListener('click', hideMessageModalByClick)
  }
}
