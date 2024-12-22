import { resetEffects, createSlider, applyEffects, setupSliderUpdate, removeEffectsChangeHandlers, removeSliderUpdateHandler } from './effects.js';
import { resetScale, scaleControlClickHandler } from './scale.js';
import { sendData } from './api.js';

const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_REGEX = /^#[A-Za-z0-9а-яё]{1,19}$/i;
const ALERT_SHOW_TIME = 5000;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const FormError = {
  COUNT_EXCEEDED: `Максимальное количество хэштегов — ${MAX_HASHTAGS}`,
  UNIQUE_HASHTAGS: 'Хэш-теги повторяются',
  INCORRECT_HASHTAG: 'Введен невалидный хэштег',
  LONG_DESCRIPTION: `Описание должно быть не длинее ${MAX_DESCRIPTION_LENGTH} символов`
};

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправка...'
};

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const closeButton = form.querySelector('.img-upload__cancel');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const errorMessageElement = document.querySelector('.error-message');
const errorMessageText = errorMessageElement.querySelector('p');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const submitButton = form.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelectorAll('.effects__preview');

let isErrorModalOpen = false;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateDescriptionLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const splitHashtags = (value) => value.trim().split(/\s+/).filter((tag) => Boolean(tag.length));

const isCursorInInputField = () => document.activeElement === hashtagsField || document.activeElement === descriptionField;

const validateHashtagCount = (value) => splitHashtags(value).length <= MAX_HASHTAGS;

const validateHashtags = (value) => splitHashtags(value).every((tag) => HASHTAG_REGEX.test(tag));

const validateUniqueHashtags = (value) => {
  const hashtags = splitHashtags(value).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const scaleControlSmallerHandler = () => {
  scaleControlClickHandler(false);
};

const scaleControlBiggerHandler = () => {
  scaleControlClickHandler(true);
};

const closeForm = () => {
  form.reset();
  pristine.reset();
  fileField.value = '';
  resetEffects();
  resetScale();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', formPressESCHandler);
  removeEffectsChangeHandlers();
  removeSliderUpdateHandler();
  closeButton.removeEventListener('click', closeForm);
  scaleControlSmaller.removeEventListener('click', scaleControlSmallerHandler);
  scaleControlBigger.removeEventListener('click', scaleControlBiggerHandler);
};

const showForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', formPressESCHandler);
  createSlider();
  setupSliderUpdate();
  applyEffects();
  closeButton.addEventListener('click', closeForm);
  scaleControlSmaller.addEventListener('click', scaleControlSmallerHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerHandler);
};

const showErrorMessage = (message) => {
  errorMessageText.innerHTML = message;
  errorMessageElement.classList.remove('hidden');
  setTimeout(() => {
    errorMessageElement.classList.add('hidden');
  }, ALERT_SHOW_TIME);
};

function formPressESCHandler (evt) {
  if (evt.key === 'Escape' && !isCursorInInputField() && !isErrorModalOpen) {
    evt.preventDefault();
    closeForm();
  }
}

const formFileIsSelectedHandler = (evt) => {
  const file = evt.target.files[0];
  if (file && FILE_TYPES.includes(file.name.split('.').pop().toLowerCase())) {
    imagePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreview.src}')`;
    });
    showForm();
  }
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && isCursorInInputField()) {
    evt.stopPropagation();
  }
});

pristine.addValidator(descriptionField, validateDescriptionLength, FormError.LONG_DESCRIPTION);
pristine.addValidator(hashtagsField, validateUniqueHashtags, FormError.UNIQUE_HASHTAGS);
pristine.addValidator(hashtagsField, validateHashtags, FormError.INCORRECT_HASHTAG);
pristine.addValidator(hashtagsField, validateHashtagCount, FormError.COUNT_EXCEEDED);

fileField.addEventListener('change', formFileIsSelectedHandler);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const showModal = (template, buttonSelector, message) => {
  const modalElement = template.cloneNode(true);
  const modalButton = modalElement.querySelector(buttonSelector);
  body.appendChild(modalElement);

  const closeModal = () => {
    const modal = document.querySelector(message);
    if (modal) {
      body.removeChild(modal);
    }
    if (buttonSelector === '.error__button') {
      isErrorModalOpen = false;
    }
  };

  modalButton.addEventListener('click', closeModal);

  const onDocumentClick = (evt) => {
    if (evt.target !== document.querySelector(`${message}__title`) && evt.target !== document.querySelector(`${message}__inner`)) {
      closeModal();
      document.removeEventListener('click', onDocumentClick);
    }
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  if (buttonSelector === '.error__button') {
    isErrorModalOpen = true;
  }
};

const showSuccessMessage = () => {
  showModal(successTemplate, '.success__button', '.success');
};

const showErrorMessageModal = () => {
  showModal(errorTemplate, '.error__button', '.error');
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(form);
      blockSubmitButton();
      sendData(formData)
        .then(() => {
          resetEffects();
          resetScale();
          form.reset();
          fileField.value = '';
          closeForm();
          showSuccessMessage();
          unblockSubmitButton();
        })
        .catch(() => {
          showErrorMessage('Не удалось отправить форму. Попробуйте ещё раз');
          showErrorMessageModal();
        })
        .finally(unblockSubmitButton);
    } else {
      const errorText = pristine.getErrors().map((errorItem) => errorItem.errors.join('<br>')).join('<br>');
      showErrorMessage(errorText);
    }
  });
};

export { setUserFormSubmit };
