export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch(console.log);
  }

  postNewCard(name,link) {
    return fetch(`${this._baseUrl}/cards`, { 
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch(console.log);
  }

  confirmDelete(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, { 
      method: "DELETE",
      headers: this._headers
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
  .catch(console.log);
}

deleteLike(cardId){
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { 
    method: "DELETE",
    headers: this._headers
}).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
.catch(console.log);
}

addLike(cardId){
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { 
    method: "PUT",
    headers: this._headers
}).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
.catch(console.log);
}

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch(console.log);
  }

  editUserInfo({form__name, form__role}) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: form__name,
        about: form__role,
      }),
    });
  }

}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "d117ca4c-01ef-4f19-abee-387b4e32e69d",
    "Content-Type": "application/json",
  },
});
