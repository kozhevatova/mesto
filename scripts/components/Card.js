export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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

  // удаление фото
  _handleDeleteButtonClicked() {
    this._handleCardDelete(this._data);
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
