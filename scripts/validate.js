const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
};

const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.textContent = '';
  error.classList.remove(errorClass);
};

const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
  } else {
    button.classList.remove(inactiveButtonClass);
  }
};

const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));

  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(data.inputSelector));
    const button = form.querySelector(data.submitButtonSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
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
  errorClass: 'popup__input-error_active'
});
