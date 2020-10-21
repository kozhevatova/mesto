import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, image}) {
    super({popupSelector});
    this._name = image.name;
    this._link = image.link;
  }

  open() {
    super.open();
    this._popup.querySelector('.popup__name_place_zoomed-image').textContent = this._name;
    this._popup.querySelector('.popup__image').src = this._link;
  }
}