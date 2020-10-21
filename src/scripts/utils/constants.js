const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popupEditForm = page.querySelector('.popup_type_edit-form');
const inputProfileName = popupEditForm.querySelector('.popup__name');
const inputProfileDescription = popupEditForm.querySelector('.popup__description');

export {editButton, addButton, inputProfileName, inputProfileDescription };