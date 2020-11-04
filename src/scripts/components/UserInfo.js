export default class UserInfo {
  constructor({nameSelector, infoSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._data = { name: this._name.textContent, info: this._info.textContent, avatar: this._avatar.src, id: this.id};
    return this._data;
  }

  setUserInfo(name, info, avatar, id) {
    this._name.textContent = name;
    this._info.textContent = info;
    this._avatar.style.background = `center/cover url(${avatar}) no-repeat`;
    this.id = id;
  }
}