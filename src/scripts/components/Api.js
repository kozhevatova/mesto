import Section from "./Section";

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  }

  editUserInfo(newName, newInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: newName,
        about: newInfo
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: 'PUT',
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: 'DELETE',
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: 'DELETE',
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  }

  editAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  }
}