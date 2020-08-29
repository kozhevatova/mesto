const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');

const editForm = document.querySelector('.edit-form');
const editFormContainer = editForm.querySelector('.edit-form__container');
const closeEditFormButton = editForm.querySelector('.edit-form__close-button');

const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__subtitle');

const inputProfileName = editForm.querySelector('.edit-form__name');
const inputProfileDescription = editForm.querySelector('.edit-form__description');

const editFormToggle = () => {
    editForm.classList.toggle('edit-form_opened');
    page.classList.toggle('page_overflow-hidden');

    if(editForm.classList.contains('edit-form_opened')) {
        inputProfileName.value = profileName.textContent;
        inputProfileDescription.value = profileDescription.textContent;
    }
}

const changeStateEditForm = (event) => {
    if(event.target !== event.currentTarget) {
        return;
    }
    editFormToggle();
};

const editFromSubmitHandler = (event) => {
    event.preventDefault();

    profileName.textContent = inputProfileName.value;
    profileDescription.textContent = inputProfileDescription.value;
    editFormToggle();
};

editButton.addEventListener('click', changeStateEditForm);
closeEditFormButton.addEventListener('click', changeStateEditForm);
editForm.addEventListener('click', changeStateEditForm);
editFormContainer.addEventListener('submit', editFromSubmitHandler);
