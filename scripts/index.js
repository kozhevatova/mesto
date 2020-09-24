const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const elementsContainer = page.querySelector('.elements');
const elementTemplate = page.querySelector('#element-template').content;

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

// для приближения фото
const popupZoomedImage = page.querySelector('.popup_type_zoomed-image');
const popupImage = popupZoomedImage.querySelector('.popup__image');
const closeButtonZoomedImage = popupZoomedImage.querySelector('.popup__close-button');
const imageName = popupZoomedImage.querySelector('.popup__name');

const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevsc.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg',
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg',
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka-alex-glebov.jpg',
  },
  {
    name: 'Республика Коми',
    link: './images/komi-vladimir-fedotov.jpg',
  },
  {
    name: 'Байкал',
    link: './images/baikal-markus-winkler.jpg',
  },
];

// открытие/закрытие попапа
const popupToggle = (popup) => {
  popup.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow-hidden');
};

// вызов события очистки формы
const resetForm = (form) => {
  if (!form.classList.contains('popup__form_type_zoomed-image')) {
    form.reset();
  }
};

// закрытие попапа при нажатии на фон
const closePopupByClickOnOverlay = (event, popup) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  resetForm(popup.querySelector('.popup__form'));
  popupToggle(popup);
};

// обработчик нажатия на кнопку редактирования профиля
const editButtonClickHandler = (popup) => {
  if (!popup.classList.contains('popup_opened')) {
    inputProfileName.value = profileName.textContent;
    inputProfileDescription.value = profileDescription.textContent;
  }

  popupToggle(popup);
};

// обработчик нажатия на кнопку добавления фото
const addButtonClickHandler = (popup) => {
  inputPhotoName.value = '';
  inputPhotoLink.value = '';

  popupToggle(popup);
};

// добавление лайка
const addLike = (element) => {
  element.querySelector('.element__like').addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_active');
  });
};

// удаление фото
const deletePhoto = (element) => {
  element.querySelector('.element__delete-button').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
};

// приближение фото
const zoomPhoto = (elementImage) => {
  elementImage.addEventListener('click', (event) => {
    popupImage.src = event.target.src;
    imageName.textContent = event.target.closest('.element').querySelector('.element__place-name').textContent;
    popupToggle(popupZoomedImage);
  });
};

// создание нового элемента с фото
const createCard = (name, link) => {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');

  element.querySelector('.element__place-name').textContent = name;
  elementImage.src = link;

  addLike(element);
  deletePhoto(element);
  zoomPhoto(elementImage);

  return element;
};

// добавление фотографий на страницу "из коробки"
const elements = initialCards.map((item) => createCard(item.name, item.link));
elementsContainer.append(...elements);

// обработчик формы редактирования профиля
const editFormSubmitHandler = (event, popup) => {
  event.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;

  popupToggle(popup);
};

// обработчик формы добавления фото
const addFormSubmitHandler = (event, popup) => {
  event.preventDefault();

  if (inputPhotoName.value !== '' && inputPhotoLink.value !== '') {
    const newElement = createCard(inputPhotoName.value, inputPhotoLink.value);
    elementsContainer.prepend(newElement);
  }

  popupToggle(popup);
};

// обработчик нажатия на кнопку Esc
const escButtonClickHandler = (event) => {
  const openedPopup = document.querySelector('.popup_opened');
  const form = openedPopup.querySelector('.popup__form');
  if (event.key === 'Escape' && openedPopup != null) {
    resetForm(form);
    popupToggle(openedPopup);
  }
};

// событие нажатия на кнопку клавиатуры
document.addEventListener('keydown', (event) => {
  escButtonClickHandler(event);
});

// события формы редактирования профиля
editButton.addEventListener('click', () => {
  editButtonClickHandler(popupEditForm);
});
closeEditFormButton.addEventListener('click', () => {
  popupToggle(popupEditForm);
});
popupEditForm.addEventListener('click', (event) => {
  closePopupByClickOnOverlay(event, popupEditForm);
});
popupContainerEditForm.addEventListener('submit', (event) => {
  editFormSubmitHandler(event, popupEditForm);
});

// события формы добавления фотографий
addButton.addEventListener('click', () => {
  addButtonClickHandler(popupAddForm);
});
closeAddFormButton.addEventListener('click', () => {
  popupToggle(popupAddForm);
});
popupAddForm.addEventListener('click', (event) => {
  closePopupByClickOnOverlay(event, popupAddForm);
});
popupContainerAddForm.addEventListener('submit', (event) => {
  addFormSubmitHandler(event, popupAddForm);
});

// события попапа с приближенной фотографией
closeButtonZoomedImage.addEventListener('click', () => {
  popupToggle(popupZoomedImage);
});
popupZoomedImage.addEventListener('click', (event) => {
  closePopupByClickOnOverlay(event, popupZoomedImage);
});
