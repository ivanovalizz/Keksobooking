const FETCH_ADS_API_URL = 'https://22.javascript.pages.academy/keksobooking/data'
const NEW_AD_API_URL = 'https://22.javascript.pages.academy/keksobooking'
const FETCH_ADS_ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка. Не удалось загрузить похожие объявления!'
const NEW_AD_ERROR_MESSAGE = 'При создании нового объявления произошла ошибка. Не удалось создать объявление!'

export const fetchSimilarAds = (onSuccess, onFail) => {
  fetch(FETCH_ADS_API_URL)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(() => onFail(FETCH_ADS_ERROR_MESSAGE))
}

export const createNewAd = (onSuccess, onFail, body) => {
  fetch(NEW_AD_API_URL, {method: 'POST', body})
    .then(response => {
      if (response.ok) {
        onSuccess(response.json())
      } else {
        onFail(NEW_AD_ERROR_MESSAGE)
      }
    })
    .catch(() => onFail(NEW_AD_ERROR_MESSAGE))
}

