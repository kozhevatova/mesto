// отображение ошибки ввода
const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
};

// удаление ошибки ввода
const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.textContent = '';
  error.classList.remove(errorClass);
};

// проверка валидности ввода
const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
};

// проверка наличия хотя бы одного неверного ввода
const hasInvalidInput = (inputList) => Array.from(inputList).some((input) => !input.validity.valid);

// изменение активности submit кнопки
const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
  } else {
    button.classList.remove(inactiveButtonClass);
  }
};

// настройка валидации
const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));

  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(data.inputSelector));
    const button = form.querySelector(data.submitButtonSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, data.inputErrorClass, data.errorClass);
        toggleButtonState(inputList, button, data.inactiveButtonClass);
      });
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

// удаление ошибки ввода при закрытии формы
const handleReset = (popup) => {
  const errors = Array.from(popup.querySelectorAll('.popup__input-error'));
  errors.forEach((error) => {
    error.textContent = '';
    error.classList.remove('popup__input-error_active');
  });
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });
};

popupAddForm.addEventListener('reset', () => {
  handleReset(popupAddForm);
});

popupEditForm.addEventListener('reset', () => {
  handleReset(popupEditForm);
});
