import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";

export default class PopupWithConfirm extends PopupWithForm {
  open(itemElementToDelete, itemId) {
    super.open();
    this.itemElementToDelete = itemElementToDelete;
    this.itemId = itemId;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => {
      this._handleFormSubmit(event);
    });
  }
}