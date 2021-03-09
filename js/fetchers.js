// Загружает похожие объявления с сервера
export const fetchSimilarAds = (onSuccess, onFail) => {
  const errorMessage = 'При загрузке данных с сервера произошла ошибка. Не удалось загрузить похожие объявления!'
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onFail(errorMessage));
};

// Отправляет новое объявление с данными из формы на сервер
export const createNewAd = (onSuccess, onFail, body) => {
  const errorMessage = 'При создании нового объявления произошла ошибка. Не удалось создать объявление!'
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess(response.json());
      } else {
        onFail(errorMessage);
      }
    })
    .catch(() => {
      onFail(errorMessage);
    });
};
