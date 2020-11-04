const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popupEditForm = page.querySelector('.popup_type_edit-form');
const popupAddForm = page.querySelector('.popup_type_add-form');
const popupEditAvatarForm = page.querySelector('.popup_type_edit-avatar-form');
const inputProfileName = popupEditForm.querySelector('.popup__name');
const inputProfileDescription = popupEditForm.querySelector('.popup__description');
const editAvatarButton = page.querySelector('.profile__edit-avatar-button');
const saveButtonEditForm = popupEditForm.querySelector('.popup__save-button');
const saveButtonAddForm = popupAddForm.querySelector('.popup__save-button');
const saveButtonEditAvatarForm = popupEditAvatarForm.querySelector('.popup__save-button');
const buttonLoadingText = "Сохранение...";

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  errorSelector: '.popup__input-error',
};

export { editButton, addButton, inputProfileName, inputProfileDescription, validationConfig, editAvatarButton,
   buttonLoadingText, saveButtonAddForm, saveButtonEditForm, saveButtonEditAvatarForm };