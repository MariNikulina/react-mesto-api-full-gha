class Api {
  constructor(hostRequest) {
    this._hostRequest = hostRequest;
  }

  _checkResponse = (res) => {
    return res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  //1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    //return fetch(this._hostRequest + this._cohortId + '/users/me', {
      return fetch(this._hostRequest + '/users/me', {
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
      return fetch(this._hostRequest + '/cards', {
      credentials: 'include',
    })
    .then(this._checkResponse())
  }

  //3. Редактирование профиля
  updateUserInfo({ name, about }) {
    //return fetch(this._hostRequest + this._cohortId + '/users/me', {
      return fetch(this._hostRequest + '/users/me', {
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
      return fetch(this._hostRequest + '/cards', {
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
      return fetch(this._hostRequest + '/cards/' + id, {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(this._checkResponse())
  }

  //8. Постановка лайка
  likeCard(id) {
    //return fetch(this._hostRequest + this._cohortId + '/cards/' + id + '/likes', {
      return fetch(this._hostRequest + '/cards/' + id + '/likes', {
      credentials: 'include',
      method: 'PUT'
    })
    .then(this._checkResponse())
  }

  //8. Снятие лайка
  dislikeCard(id) {
    //return fetch(this._hostRequest + this._cohortId + '/cards/' + id + '/likes', {
      return fetch(this._hostRequest + '/cards/' + id + '/likes', {
      credentials: 'include',
      method: 'DELETE'
    })
    .then(this._checkResponse())
  }

  //9. Обновление аватара пользователя
  updateAvatar({ avatar }) {
    //return fetch(this._hostRequest + this._cohortId + '/users/me/avatar', {
      return fetch(this._hostRequest + '/users/me/avatar', {
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

//export const api = new Api('https://api.mesto.marina.nomoredomainsicu.ru');
export const api = new Api('http://localhost:3000');
