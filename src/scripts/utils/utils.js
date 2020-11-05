import { buttonLoadingText } from './constants.js';

//Изменение текста кнопки сохранения во время загрузки
const renderLoading = (button, isLoading, text) => {
  if (isLoading) {
    button.text = buttonLoadingText;
  } else {
    button.text = text;
  }
}

export { renderLoading };