import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import {
  editButton, 
  addButton, 
  inputProfileName, 
  inputProfileDescription, 
  validationConfig,
  editAvatarButton,
  buttonLoadingText,
  saveButtonEditForm,
  saveButtonAddForm,
  saveButtonEditAvatarForm
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

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
});

const cards = api.getInitialCards().then((res) => cardList.renderItems(res));


//добавление новой карточки в разметку
const addCardToCardList = (item) => {
  const card = new Card(item, {
    handleCardClick: () => {
      zoomedImage.open(item.link, item.name);
    },
    handleLikeAdd: () => {
      api.addLike(item._id).then((res) => {
        card.showLikes(res.likes.length);
      });
    },
    handleLikeDelete: () => {
      api.deleteLike(item._id).then((res) => {
        card.showLikes(res.likes.length);
      });
    },
    handleCardDelete: () => {
      deleteConfirmPopup.open(card, item._id);
    }
  },
    '.element-template');

  const cardElement = card.generateCard();

  if (card._data.owner._id !== userInfo.getUserInfo().id) {
    card.disableDelete();
  }

  return cardElement;
  // cardList.addItem(cardElement);
};

const appendCard = (cardElement) => {
  cardList.appendItem(cardElement);
};

const prependCard = (cardElement) => {
  cardList.prependItem(cardElement);
}

//добавление фотографий на страницу "из коробки"
const cardList = new Section({
  items: cards, renderer: (item) => {
    appendCard(addCardToCardList(item));
  }
}, '.elements');

//Изменение текста кнопки сохранения во время загрузки
const renderLoading = (button, isLoading, text) => {
  if(isLoading) {
    button.text = buttonLoadingText;
  } else {
    button.text = text;
  }
}

//попап с формой редактирования профиля
const editFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-form', handleFormSubmit: (event, formValues) => {
    event.preventDefault();

    renderLoading(saveButtonEditForm, true, 'Сохранить');
    api.editUserInfo(formValues.popupName, formValues.popupDescription).then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    }).finally(() => {
      renderLoading(saveButtonEditForm, false, 'Сохранить');
    });

    editFormPopup.close();
  }
});

//попап с формой добавления фото
const addFormPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-form', handleFormSubmit: (event, formValues) => {
    event.preventDefault();

    renderLoading(saveButtonAddForm, true, 'Создать');
    api.addNewCard(formValues.popupName, formValues.popupDescription).then((res) => {
      prependCard(addCardToCardList(res));
      console.log(saveButtonAddForm.text);
    }).finally(() => {
      renderLoading(saveButtonAddForm, false, 'Создать');
    });

    addFormPopup.close();
  }
});

//форма подтверждения удаления фото
const deleteConfirmPopup = new PopupWithConfirm({
  popupSelector: '.popup_type_delete-confirm', handleFormSubmit: (evt) => {
    evt.preventDefault();

    api.deleteCard(deleteConfirmPopup.itemId).then((res) => {
      deleteConfirmPopup.itemElementToDelete.removeCard();
    });

    deleteConfirmPopup.close();
  }
});

const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar-form', handleFormSubmit: (evt, formValues) => {
    evt.preventDefault();

    renderLoading(saveButtonEditAvatarForm, true, 'Сохранить');
    api.editAvatar(formValues.avatarUrl).then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    }).finally(() => {
      renderLoading(saveButtonEditAvatarForm, false, 'Сохранить');
    });

    editAvatarPopup.close();
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
const editAvatarFormValidator = validateForm(editAvatarPopup);

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
deleteConfirmPopup.setEventListeners();
editAvatarPopup.setEventListeners();

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

const handleEditAvatarButtonClick = () => {
  editAvatarFormValidator.toggleButtonState();
  editAvatarPopup.open();
}

editButton.addEventListener('click', handleEditButtonClick);

addButton.addEventListener('click', handleAddButtonClick);

editAvatarButton.addEventListener('click', handleEditAvatarButtonClick);
