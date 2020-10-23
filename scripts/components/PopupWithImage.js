import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(link, name) {
    super.open();
  
    this._popup.querySelector('.popup__name_place_zoomed-image').textContent = name;
    this._popup.querySelector('.popup__image').src = link;
  }
}