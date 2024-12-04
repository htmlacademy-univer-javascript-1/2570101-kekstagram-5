const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const closeButton = form.querySelector('.img-upload__cancel');

const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG = /^#[A-Za-z0-9а-яё]{1,19}$/i;

const FORM_ERRORS = {
  COUNT_EXCEEDED: `Максимальное количество хэштегов — ${MAX_HASHTAGS}`,
  UNIQUE_HASHTAGS: 'Хэш-теги повторяются',
  INCORRECT_HASHTAG: 'Введен невалидный хэштег',
  LONG_DESCRIPTION: `Описание должно быть не длинее ${MAX_DESCRIPTION_LENGTH} символов`
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateLengthDescription = (value) => value.length <= 140;

const splitHashtags = (value) => value.trim().split(/\s+/).filter((tag) => Boolean(tag.length));

const cursorInInputField = () => document.activeElement === hashtagsField || document.activeElement === descriptionField;

const validateHashtagCount = (value) => splitHashtags(value).length <= MAX_HASHTAGS;

const validateHashtags = (value) => splitHashtags(value).every((tag) => HASHTAG.test(tag));

const validateUniqueHashtags = (value) => {
  const hashtags = splitHashtags(value).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};
const handleKeydown = (evt) => {
  if (evt.key === 'Escape' && !cursorInInputField()) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeForm();
  }
};

const closeForm = () => {
  form.reset();
  pristine.reset();
  fileField.value = '';
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydown);
};

const showForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydown);
};

const handleInputChange = (evt) => {
  if (evt.target.files.length) {
    showForm();
  }
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && cursorInInputField()) {
    evt.stopPropagation();
  }
});

pristine.addValidator(descriptionField, validateLengthDescription, FORM_ERRORS.LONG_DESCRIPTION);
pristine.addValidator(hashtagsField, validateUniqueHashtags, FORM_ERRORS.UNIQUE_HASHTAGS);
pristine.addValidator(hashtagsField, validateHashtags, FORM_ERRORS.INCORRECT_HASHTAG);
pristine.addValidator(hashtagsField, validateHashtagCount, FORM_ERRORS.COUNT_EXCEEDED);

fileField.addEventListener('change', handleInputChange);
closeButton.addEventListener('click', closeForm);

