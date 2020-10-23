export default class Popup {
  constructor({popupSelector}) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');

    // событие нажатия на кнопку клавиатуры
    document.addEventListener('keydown',this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');

    // событие нажатия на кнопку клавиатуры
    document.removeEventListener('keydown',this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape' && this._popup != null) {
      this.close();
    }
  }

  _closePopupByClickOnOverlay(event) {
    if (event.target !== event.currentTarget) {
      return;
    }
  
    this.close();
  };

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (event) => {
      this._closePopupByClickOnOverlay(event);
    });
  }
}