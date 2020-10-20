export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // добавление обработчиков событий
  _setEventListeners() {
    // лайк
    this._element.querySelector('.element__like').addEventListener('click', (event) => {
      this._handleLikeClicked(event);
    });

    // удаление фото
    this._element.querySelector('.element__delete-button').addEventListener('click', (event) => {
      this._handleDeleteButtonClicked(event);
    });

    // зум фото
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // закрытие по нажатию на Esc
  // _handleEscButtonClick(event) {
  //   const openedPopup = document.querySelector('.popup_opened');
  //   if (event.key === 'Escape' && openedPopup != null) {
  //     openedPopup.classList.remove('popup_opened');
  //     document.querySelector('.page').classList.remove('page_overflow-hidden');
  //     // удаление события нажатия на кнопку клавиатуры
  //     document.removeEventListener('keydown', this._handleEscButtonClick);
  //   }
  // }

  // // открытие зум фото
  // _handleOpenPopupImage() {
  //   const popupZoomedImage = document.querySelector('.popup_type_zoomed-image');
  //   const popupImage = popupZoomedImage.querySelector('.popup__image');

  //   popupImage.src = this._element.querySelector('.element__image').src;
  //   popupZoomedImage.querySelector('.popup__name').textContent = this._element.querySelector('.element__place-name').textContent;
  //   popupZoomedImage.classList.add('popup_opened');
  //   document.querySelector('.page').classList.add('page_overflow-hidden');

  //   // событие нажатия на кнопку клавиатуры
  //   document.addEventListener('keydown', this._handleEscButtonClick);
  // }

  // удаление фото
  _handleDeleteButtonClicked() {
    this._element.remove();
  }

  // лайк фото
  _handleLikeClicked() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content
      .querySelector('.element').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__place-name').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
