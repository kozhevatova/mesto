const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');

const editForm = document.querySelector('.edit-form');
const saveButton = editForm.querySelector('.edit-form__save-button');
const closeEditFormButton = editForm.querySelector('.edit-form__close-button');

const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__subtitle');

const name = editForm.querySelector('.edit-form__name');
const description = editForm.querySelector('.edit-form__description');

name.value = profileName.textContent;
description.value = profileDescription.textContent;

const editFormToggle = () => {
    editForm.classList.toggle('edit-form_opened');
    page.classList.toggle('page_overflow-hidden');
}

const changeStateEditForm = (event) => {
    if(event.target !== event.currentTarget) {
        return;
    }
    editFormToggle();
};

const editFromSubmitHandler = (event) => {
    event.preventDefault();

    profileName.textContent = name.value;
    profileDescription.textContent = description.value;
    editFormToggle();
};

editButton.addEventListener('click', changeStateEditForm);
closeEditFormButton.addEventListener('click', changeStateEditForm);
editForm.addEventListener('click', changeStateEditForm);
saveButton.addEventListener('click', editFromSubmitHandler);
