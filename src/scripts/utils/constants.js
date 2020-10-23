const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popupEditForm = page.querySelector('.popup_type_edit-form');
const inputProfileName = popupEditForm.querySelector('.popup__name');
const inputProfileDescription = popupEditForm.querySelector('.popup__description');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  errorSelector: '.popup__input-error',
};

export { editButton, addButton, inputProfileName, inputProfileDescription, validationConfig };