import { domen, token, cohort } from "./utils";

class Api {
  constructor(host, token, groupId) {
    this._host = host;
    this._token = token;
    this._groupId = groupId;
    this._domen = `${this._host}/${this._groupId}`;
  }

  checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardsData() {
    return fetch(`${this._domen}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this.checkRes);
  }

  getUserInfo() {
    return fetch(`${this._domen}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this.checkRes);
  }

  patchUserInfo(userData) {
    return fetch(`${this._domen}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })

    .then(this.checkRes);
  }

  postCard(newCard) {
    return fetch(`${this._domen}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
    .then(this.checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._domen}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this.checkRes);
  }

  getAppInfo() {
    return Promise.all([this.getCardsData(), this.getUserInfo()]);
  }

  likeCard(cardId) {
    return fetch(`${this._domen}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this.checkRes);
  }

  dislikeCard(cardId) {
    return fetch(`${this._domen}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this.checkRes)
    .then((res) => (console.log(res)));
  }

  updateAvatar(url) {
    return fetch(`${this._domen}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this.checkRes)
    .catch((err) =>{
      console.log(err);
    });
  }
}

export const api = new Api(domen, token, cohort);
