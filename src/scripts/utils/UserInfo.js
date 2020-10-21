export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = document.querySelector(nameSelector).textContent;
    this._info = document.querySelector(infoSelector).textContent;
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    this._data = { name: this._name, info: this._info };
    return this._data;
  }

  setUserInfo(name, info) {
    this._name = name;
    this._info = info;
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._infoSelector).textContent = info;
  }
}