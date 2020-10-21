import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector});
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector('.popup__form');
    this._inputList = this.form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      console.log(this._formValues);
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => {
      this._handleFormSubmit(event,this._getInputValues());
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}