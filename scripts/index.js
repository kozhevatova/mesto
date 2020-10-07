import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { validationConfig } from './validationConfig.js';

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const elementsContainer = page.querySelector('.elements');

// для формы редактирования профиля
const popupEditForm = page.querySelector('.popup_type_edit-form');
const popupContainerEditForm = popupEditForm.querySelector('.popup__form');
const closeEditFormButton = popupEditForm.querySelector('.popup__close-button');

const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__subtitle');

const inputProfileName = popupEditForm.querySelector('.popup__name');
const inputProfileDescription = popupEditForm.querySelector('.popup__description');

// для формы добавления фото
const popupAddForm = page.querySelector('.popup_type_add-form');
const popupContainerAddForm = popupAddForm.querySelector('.popup__form');
const closeAddFormButton = popupAddForm.querySelector('.popup__close-button');

const inputPhotoName = popupAddForm.querySelector('.popup__name');
const inputPhotoLink = popupAddForm.querySelector('.popup__description');

// для попапа с приближенным фото
const popupZoomedImage = page.querySelector('.popup_type_zoomed-image');
const closeButtonZoomedImage = popupZoomedImage.querySelector('.popup__close-button');

// открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  page.classList.add('page_overflow-hidden');

  // событие нажатия на кнопку клавиатуры
  document.addEventListener('keydown',handleEscButtonClick);
};

// закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  page.classList.remove('page_overflow-hidden');

  // удаление события нажатия на кнопку клавиатуры
  document.removeEventListener('keydown', handleEscButtonClick);
};

// закрытие попапа при нажатии на фон
const closePopupByClickOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopup(event.target);
};

//включить валидацию формы
const validateForm = (popup) => {
  const formValidator = new FormValidator(validationConfig, popup.querySelector('.popup__form'));
  formValidator.enableValidation();
  return formValidator;
};

const addFormValidator = validateForm(popupAddForm);
const editFormValidator = validateForm(popupEditForm);

// обработчик нажатия на кнопку редактирования профиля
const handleEditButtonClick = (popup) => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;

  openPopup(popup);
};

// обработчик нажатия на кнопку добавления фото
const handleAddButtonClick = (popup) => {
  inputPhotoName.value = '';
  inputPhotoLink.value = '';

  addFormValidator.toggleButtonState();
  openPopup(popup);
};

// добавление фотографий на страницу "из коробки"
const elements = initialCards.map((item) => {
  const card = new Card(item, '.element-template');
  return card.generateCard();
});
elementsContainer.append(...elements);

// обработчик формы редактирования профиля
const handleEditFormSubmit = (event, popup) => {
  event.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;

  closePopup(popup);
};

// обработчик формы добавления фото
const handleAddFormSubmit = (event, popup) => {
  event.preventDefault();

  const newElement = new Card({name: inputPhotoName.value, link: inputPhotoLink.value}, '.element-template');
  elementsContainer.prepend(newElement.generateCard());

  closePopup(popup);
};

// обработчик нажатия на кнопку Esc
const handleEscButtonClick = (event) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape' && openedPopup != null) {
    closePopup(openedPopup);
  }
};

// события формы редактирования профиля
editButton.addEventListener('click', () => {
  handleEditButtonClick(popupEditForm);
});
closeEditFormButton.addEventListener('click', () => {
  closePopup(popupEditForm);
});
popupEditForm.addEventListener('click', (event) => {
  closePopupByClickOnOverlay(event);
});
popupContainerEditForm.addEventListener('submit', (event) => {
  handleEditFormSubmit(event, popupEditForm);
});

// события формы добавления фотографий
addButton.addEventListener('click', () => {
  handleAddButtonClick(popupAddForm);
});
closeAddFormButton.addEventListener('click', () => {
  closePopup(popupAddForm);
});
popupAddForm.addEventListener('click', (event) => {
  closePopupByClickOnOverlay(event);
});
popupContainerAddForm.addEventListener('submit', (event) => {
  handleAddFormSubmit(event, popupAddForm);
});

// события попапа с приближенной фотографией
closeButtonZoomedImage.addEventListener('click', () => {
  closePopup(popupZoomedImage);
});
popupZoomedImage.addEventListener('click', (event) => {
  closePopupByClickOnOverlay(event);
});

