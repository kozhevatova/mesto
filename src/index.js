import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import {
  editButton, addButton, inputProfileName, inputProfileDescription, validationConfig
} from './scripts/utils/constants.js';
import './index.html';
import './index.css';
import Api from './scripts/components/Api.js';
import PopupWithConfirm from './scripts/components/PopupWithConfirm.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

const zoomedImage = new PopupWithImage({
  popupSelector: '.popup_type_zoomed-image'
});

zoomedImage.setEventListeners();


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'b1b736c3-ab37-40d8-99c3-eedcbb719e9d',
    'Content-Type': 'application/json'
  }
});

const cards = api.getInitialCards().then((res) => cardList.renderItems(res));
api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
});

//добавление новой карточки в разметку
const addCardToCardList = (item) => {
  const card = new Card(item, '.element-template', () => {
    zoomedImage.open(item.link, item.name);
  }, () => {
    api.addLike(item._id).then((res) => {
      card.showLikes(res.likes.length);
    });
  }, () => {
    api.deleteLike(item._id).then((res) => {
      card.showLikes(res.likes.length);
    });
  }, () => {
    deleteConfirmPopup.open(card, item._id);
  });

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

//добавление фотографий на страницу "из коробки"
const cardList = new Section({
  items: cards, renderer: (item) => {
    addCardToCardList(item);
  }
}, '.elements');

// cardList.renderItems();

//попап с формой редактирования профиля
const editFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-form', handleFormSubmit: (event, formValues) => {
    event.preventDefault();
    api.editUserInfo(formValues.popupName, formValues.popupDescription).then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    });
    editFormPopup.close();
  }
});

//попап с формой добавления фото
const addFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-form', handleFormSubmit: (event, formValues) => {
    event.preventDefault();
    api.addNewCard(formValues.popupName, formValues.popupDescription).then((res) => {
      addCardToCardList(res);
    });
    addFormPopup.close();
  }
});

//форма подтверждения удаления фото
const deleteConfirmPopup = new PopupWithConfirm({
  popupSelector: '.popup_type_delete-confirm', handleFormSubmit: (evt,{}) => {
    evt.preventDefault();
    
    api.deleteCard(deleteConfirmPopup.id).then((res) => {
      deleteConfirmPopup.item.removeCard(); 
    });
    deleteConfirmPopup.close();
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
deleteConfirmPopup.setEventListeners();

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

