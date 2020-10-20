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
const popupImage = page.querySelector('.element__image');
const popupImageName = page.querySelector('.popup__name');
const closeButtonZoomedImage = page.querySelector('.popup__close-button');

export { popupImage, popupImageName };