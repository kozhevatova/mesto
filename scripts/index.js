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

  const button = popup.querySelector(validationConfig.submitButtonSelector);
  disableButton(button, validationConfig.inactiveButtonClass);

  openPopup(popup);
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

    openPopup(popupZoomedImage);
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
const handleEditFormSubmit = (event, popup) => {
  event.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;

  closePopup(popup);
};

// обработчик формы добавления фото
const handleAddFormSubmit = (event, popup) => {
  event.preventDefault();

  const newElement = createCard(inputPhotoName.value, inputPhotoLink.value);
  elementsContainer.prepend(newElement);

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
