import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector}){
    super({popupSelector});
    this._zoomedImage = this._popup.querySelector('.popup__image');
    this._nameOfZoomedImage = this._popup.querySelector('.popup__name_place_zoomed-image');
  }

  open(link, name) {
    super.open();
  
    this._nameOfZoomedImage.textContent = name;
    this._zoomedImage.src = link;
  }
}