import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import { initialCards } from './scripts/utils/initialCards.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import {
  editButton, addButton, inputProfileName, inputProfileDescription, validationConfig
} from './scripts/utils/constants.js';
import './index.html';
import './index.css';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__subtitle'
});

const zoomedImage = new PopupWithImage({
  popupSelector: '.popup_type_zoomed-image'
});

zoomedImage.setEventListeners();

//добавление новой карточки в разметку
const addCardToCardList = (item) => {
  const card = new Card(item, '.element-template', () => {
    zoomedImage.open(item.link, item.name);
  });

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

//добавление фотографий на страницу "из коробки"
const cardList = new Section({
  items: initialCards, renderer: (item) => {
    addCardToCardList(item);
  }
}, '.elements');

cardList.renderItems();

//попап с формой редактирования профиля
const editFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-form', handleFormSubmit: (event, formValues) => {
    event.preventDefault();

    userInfo.setUserInfo(formValues.popupName, formValues.popupDescription);
    editFormPopup.close();
  }
});

//попап с формой добавления фото
const addFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-form', handleFormSubmit: (event, formValues) => {
    event.preventDefault();

    addCardToCardList({ name: formValues.popupName, link: formValues.popupDescription });
    addFormPopup.close();
  }
});

// включить валидацию формы
const validateForm = (popup) => {
  const formValidator = new FormValidator(validationConfig, popup.form);
  formValidator.enableValidation();
  return formValidator;
};

const addFormValidator = validateForm(addFormPopup);
const editFormValidator = validateForm(editFormPopup);

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();

// обработчик нажатия на кнопку редактирования профиля
const handleEditButtonClick = () => {
  editFormValidator.toggleButtonState();

  const profileInfo = userInfo.getUserInfo();
  inputProfileName.value = profileInfo.name;
  inputProfileDescription.value = profileInfo.info;

  editFormPopup.open();
};

// обработчик нажатия на кнопку добавления фото
const handleAddButtonClick = () => {
  addFormValidator.toggleButtonState();
  addFormPopup.open();
};

editButton.addEventListener('click', handleEditButtonClick);

addButton.addEventListener('click', handleAddButtonClick);

