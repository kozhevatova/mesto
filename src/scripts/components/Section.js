export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(cards) {
    cards.forEach(item => this._renderer(item));
  }

  prependItem(item) {
    this._container.prepend(item);
  }

  appendItem(item) {
    this._container.append(item);
  }
}