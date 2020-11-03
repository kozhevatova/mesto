export default class Card {
  constructor(data, cardSelector, handleCardClick, handleLikeAdd, handleLikeDelete, handleCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handleLikeDelete;
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
    this._handleCardDelete();
  }

  removeCard(){
    this._element.remove();
  }

  // лайк фото
  _handleLikeClicked() {
    console.log(this._data.likes);
    this._likeElement = this._element.querySelector('.element__like');

    if (this._likeElement.classList.contains('element__like_active')) {
      this._likeElement.classList.remove('element__like_active');
      this._handleLikeDelete();
    } else {
      this._likeElement.classList.add('element__like_active');
      this._handleLikeAdd();
    }
  }

  showLikes(num) {
    this._element.querySelector('.element__like-num').textContent = num;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content
      .querySelector('.element').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__place-name').textContent = this._name;
    this._element.querySelector('.element__like-num').textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}
