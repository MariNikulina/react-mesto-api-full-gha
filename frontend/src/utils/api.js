class Api {
  constructor(hostRequest, token, cohortId) {
    this._hostRequest = hostRequest;
    this._token = token;
    this._cohortId = cohortId;
  }

  _checkResponse = (res) => {
    return res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  //1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    //return fetch(this._hostRequest + this._cohortId + '/users/me', {
      return fetch('http://localhost:3000/users/me', {
      credentials: 'include',
      /*headers: {
        authorization: this._token
      }*/
    })
    .then(this._checkResponse())
  }

  //2. Загрузка карточек с сервера
  getInitialCards() {
    //return fetch(this._hostRequest + this._cohortId + '/cards', {
      return fetch('http://localhost:3000/cards', {
      credentials: 'include',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse())
  }

  //3. Редактирование профиля
  updateUserInfo({ name, about }) {
    //return fetch(this._hostRequest + this._cohortId + '/users/me', {
      return fetch('http://localhost:3000/users/me', {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      headers: {
        //authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse())
  }

  //4. Добавление новой карточки
  createNewCard({ name, link }) {
    //return fetch(this._hostRequest + this._cohortId + '/cards', {
      return fetch('http://localhost:3000/cards', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ name, link }),
      headers: {
        //authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse())
  }

  //7. Удаление карточки
  deleteCard(id) {
    //return fetch(this._hostRequest + this._cohortId + '/cards/' + id, {
      return fetch(`http://localhost:3000/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(this._checkResponse())
  }

  //8. Постановка лайка
  likeCard(id) {
    //return fetch(this._hostRequest + this._cohortId + '/cards/' + id + '/likes', {
      return fetch(`http://localhost:3000/cards/${id}/likes`, {
      credentials: 'include',
      method: 'PUT'
    })
    .then(this._checkResponse())
  }

  //8. Снятие лайка
  dislikeCard(id) {
    //return fetch(this._hostRequest + this._cohortId + '/cards/' + id + '/likes', {
      return fetch(`http://localhost:3000/cards/${id}/likes`, {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(this._checkResponse())
  }

  //9. Обновление аватара пользователя
  updateAvatar({ avatar }) {
    //return fetch(this._hostRequest + this._cohortId + '/users/me/avatar', {
      return fetch('http://localhost:3000/users/me/avatar', {
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
      headers: {
        //authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse())
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }
}

export const api = new Api('https://mesto.nomoreparties.co/v1/', 'a85b9a75-4425-400b-b52a-bf2c9d807fec', 'cohort-66');
