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

// сделать кнопку активной
const enableButton = (button, inactiveButtonClass) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

// сделать кнопку неактивной
const disableButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', 'true');
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
    disableButton(button, inactiveButtonClass);
  } else {
    enableButton(button, inactiveButtonClass);
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

// удаление ошибки ввода при закрытии формы
const handleReset = (popup, data) => {
  const errors = Array.from(popup.querySelectorAll(data.errorSelector));
  errors.forEach((error) => {
    error.textContent = '';
    error.classList.remove(data.errorClass);
  });
  const inputs = Array.from(popup.querySelectorAll(data.inputSelector));
  inputs.forEach((input) => {
    input.classList.remove(data.inputErrorClass);
  });
};

enableValidation(validationConfig);

popupAddForm.addEventListener('reset', () => {
  handleReset(popupAddForm, validationConfig);
});

popupEditForm.addEventListener('reset', () => {
  handleReset(popupEditForm, validationConfig);
});
