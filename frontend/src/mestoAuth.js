export const BASE_URL = 'api.mesto.marina.nomoredomainsicu.ru';

export const checkResponse = (res) => {
  return res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse())
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
    .then(checkResponse())
}

//проверить токен и получить данные пользователя
export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(checkResponse())
}
