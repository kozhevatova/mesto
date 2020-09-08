const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const elementsContainer = page.querySelector('.elements');
const elementTemplate = page.querySelector('#element-template').content;

// для формы редактирования профиля
const popupEditForm = page.querySelector('.popup_type_edit-form');
const popupContainerEditForm = popupEditForm.querySelector('.popup__container');
const closeEditFormButton = popupEditForm.querySelector('.popup__close-button');

const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__subtitle');

const inputProfileName = popupEditForm.querySelector('.popup__name');
const inputProfileDescription = popupEditForm.querySelector('.popup__description');

// для формы добавления фото
const popupAddForm = page.querySelector('.popup_type_add-form');
const popupContainerAddForm = popupAddForm.querySelector('.popup__container');
const closeAddFormButton = popupAddForm.querySelector('.popup__close-button');

const inputPhotoName = popupAddForm.querySelector('.popup__name');
const inputPhotoLink = popupAddForm.querySelector('.popup__description');

//для приближения фото
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

// добавление новой фото
const addElement = (name, link) => {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');

  element.querySelector('.element__place-name').textContent = name;
  elementImage.src = link;

  //добавление лайка
  element.querySelector('.element__like').addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_active');
  });

  //удаление фото
  element.querySelector('.element__delete-button').addEventListener('click', (event) => {
    event.target.parentElement.remove();
    if (elements.length > 0) {
      elements.splice(elements.indexOf(event.target.parentElement), 1);
    }
  });

  //приближение фото
  elementImage.addEventListener('click', (event) => {
    popupImage.src = event.target.src;
    imageName.textContent = event.target.parentElement.querySelector('.element__place-name').textContent;
    changeStatePopup(event,popupZoomedImage);
  });

  return element;
};

// добавление фотографий на страницу "из коробки"
const elements = initialCards.map((item) => addElement(item.name, item.link));

elementsContainer.append(...elements);

// открытие/закрытие попапа
const popupToggle = (popup) => {
  if (!popup.classList.contains('popup_opened') &&
    popup.classList.contains('popup_type_edit-form')) {
    inputProfileName.value = profileName.textContent;
    inputProfileDescription.value = profileDescription.textContent;
  }

  if (popup.classList.contains('popup_type_add-form')) {
    inputPhotoName.value = '';
    inputPhotoLink.value = '';
  }

  if(popup.classList.contains('popup_type_zoomed-image')) {
    
  }

  popup.classList.toggle('popup_opened');
  page.classList.toggle('page_overflow-hidden');
};

const changeStatePopup = (event, popup) => {
  if (event.target !== event.currentTarget) {
    return;
  }

  popupToggle(popup);
};

// обработчик формы попапа
const popupSubmitHandler = (event, popup) => {
  event.preventDefault();

  if (popup.classList.contains('popup_type_edit-form')) {
    profileName.textContent = inputProfileName.value;
    profileDescription.textContent = inputProfileDescription.value;
  }

  if (popup.classList.contains('popup_type_add-form')) {
    if (inputPhotoName.value !== '' && inputPhotoLink.value !== '') {
      const newElement = addElement(inputPhotoName.value, inputPhotoLink.value);
      elementsContainer.prepend(newElement);
      elements.push(newElement);
    }
  }

  popupToggle(popup);
};

// события формы редактирования профиля
editButton.addEventListener('click', (event) => {
  changeStatePopup(event, popupEditForm);
});
closeEditFormButton.addEventListener('click', (event) => {
  changeStatePopup(event, popupEditForm);
});
popupEditForm.addEventListener('click', (event) => {
  changeStatePopup(event, popupEditForm);
});
popupContainerEditForm.addEventListener('submit', (event) => {
  popupSubmitHandler(event, popupEditForm);
});

// события формы добавления фотографий
addButton.addEventListener('click', (event) => {
  changeStatePopup(event, popupAddForm);
});
closeAddFormButton.addEventListener('click', (event) => {
  changeStatePopup(event, popupAddForm);
});
popupAddForm.addEventListener('click', (event) => {
  changeStatePopup(event, popupAddForm);
});
popupContainerAddForm.addEventListener('submit', (event) => {
  popupSubmitHandler(event, popupAddForm);
});
inputPhotoLink.oninvalid = (event) => {
  event.target.setCustomValidity('Формат фото должен быть .jpg, .png или .svg');
};

//события попапа с приближенной фотографией
closeButtonZoomedImage.addEventListener('click', (event) => {
  changeStatePopup(event,popupZoomedImage);
});
popupZoomedImage.addEventListener('click', (event) => {
  changeStatePopup(event,popupZoomedImage);
});

