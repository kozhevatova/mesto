import PopupWithForm from "./PopupWithForm";

export default class PopupWithConfirm extends PopupWithForm {
  open(item, id) {
    super.open();
    this.item = item;
    this.id = id;
  }
}