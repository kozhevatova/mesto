export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._errorSelector = data.errorSelector;
    this._formElement = formElement;
  }

  // отображение ошибки ввода
  _showInputError(input, errorMessage) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  // удаление ошибки ввода
  _hideInputError(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._errorClass);
  }

  // проверка валидности ввода
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // сделать кнопку активной
  _enableButton(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.removeAttribute('disabled');
  }

  // сделать кнопку неактивной
  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute('disabled', 'true');
  }

  // проверка наличия хотя бы одного неверного ввода
  _hasInvalidInput(inputList) {
    return Array.from(inputList).some((input) => !input.validity.valid);
  }

  // изменение активности submit кнопки
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(button, this._inactiveButtonClass);
    } else {
      this._enableButton(button, this._inactiveButtonClass);
    }
  }

  //удаление ошибки ввода при закрытии формы
  _handleReset(popup) {
    const errors = Array.from(popup.querySelectorAll(this._errorSelector));
    const inputs = Array.from(popup.querySelectorAll(this._inputSelector));
    
    errors.forEach((error) => {
      error.textContent = '';
      error.classList.remove(this._errorClass);
    });
    
    inputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
  }
 
  _setEventListenersForReset() {
    const popupAddForm = document.querySelector('.popup_type_add-form');
    const popupEditForm = document.querySelector('.popup_type_edit-form');

    popupAddForm.addEventListener('reset', () => {
      this._handleReset(popupAddForm);
    });
    popupEditForm.addEventListener('reset', () => {
      this._handleReset(popupEditForm);
    });
  }

  // настройка валидации
  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const button = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, button);
      });
    });

    this._setEventListenersForReset();
  }

}