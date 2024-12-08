const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_REGEX = /^#[A-Za-z0-9а-яё]{1,19}$/i;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const FORM_ERRORS = {
  COUNT_EXCEEDED: `Максимальное количество хэштегов — ${MAX_HASHTAGS}`,
  UNIQUE_HASHTAGS: 'Хэш-теги повторяются',
  INCORRECT_HASHTAG: 'Введен невалидный хэштег',
  LONG_DESCRIPTION: `Описание должно быть не длинее ${MAX_DESCRIPTION_LENGTH} символов`
};

const EFFECTS = {
  none: { range: { min: 0, max: 1 }, start: 1, step: 0.1, hideSlider: true },
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'grayscale', hideSlider: false },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'sepia', hideSlider: false },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1, unit: '%', filter: 'invert', hideSlider: false },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1, unit: 'px', filter: 'blur', hideSlider: false },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1, unit: '', filter: 'brightness', hideSlider: false },
};

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const closeButton = form.querySelector('.img-upload__cancel');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderContainerElement = form.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsButtons = document.querySelectorAll('.effects__radio');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const originalEffectButton = document.querySelector('#effect-none');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const updateScale = (value) => {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const resetScale = () => {
  updateScale(DEFAULT_SCALE);
};

const scaleControlSmallerClickHandler = () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale(currentScale);
  }
};

const scaleControlBiggerClickHandler = () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale(currentScale);
  }
};

const showSlider = () => sliderContainerElement.classList.remove('hidden');
const hideSlider = () => sliderContainerElement.classList.add('hidden');

const createSlider = () => {
  hideSlider();
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {
      range: EFFECTS.none.range,
      start: EFFECTS.none.start,
      step: EFFECTS.none.step,
      connect: 'lower',
    });
  }
};

const setEffect = (effect) => {
  const effectParameters = EFFECTS[effect];

  if (effectParameters.hideSlider) {
    hideSlider();
    previewImage.style.filter = '';
    sliderElement.noUiSlider.set(EFFECTS.none.start);
  } else {
    showSlider();

    sliderElement.noUiSlider.updateOptions({
      range: effectParameters.range,
      start: effectParameters.start,
      step: effectParameters.step,
    });
    sliderElement.noUiSlider.set(effectParameters.start);
    const filterValue = `${effectParameters.filter}(${effectParameters.start}${effectParameters.unit})`;
    previewImage.style.filter = filterValue;
  }
  resetScale();
  effectLevelValue.value = effectParameters.start;
};

const applyEffects = () => {
  effectsButtons.forEach((button) => {
    button.addEventListener('change', (evt) => {
      const effect = evt.target.value;
      setEffect(effect);
    });
  });
};

const resetEffects = () => {
  originalEffectButton.checked = true;
  previewImage.style.filter = '';
  hideSlider();
};

const validateDescriptionLength = (value) => value.length <= 140;

const splitHashtags = (value) => value.trim().split(/\s+/).filter((tag) => Boolean(tag.length));

const isCursorInInputField = () => document.activeElement === hashtagsField || document.activeElement === descriptionField;

const validateHashtagCount = (value) => splitHashtags(value).length <= MAX_HASHTAGS;

const validateHashtags = (value) => splitHashtags(value).every((tag) => HASHTAG_REGEX.test(tag));

const validateUniqueHashtags = (value) => {
  const hashtags = splitHashtags(value).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const formPressESCHandler = (evt) => {
  if (evt.key === 'Escape' && !isCursorInInputField()) {
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
  resetEffects();
  resetScale();
  document.removeEventListener('keydown', formPressESCHandler);
};

const showForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', formPressESCHandler);
};

const formFileIsSelectedHandler = (evt) => {
  if (evt.target.files.length) {
    showForm();
  }
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && isCursorInInputField()) {
    evt.stopPropagation();
  }
});

pristine.addValidator(descriptionField, validateDescriptionLength, FORM_ERRORS.LONG_DESCRIPTION);
pristine.addValidator(hashtagsField, validateUniqueHashtags, FORM_ERRORS.UNIQUE_HASHTAGS);
pristine.addValidator(hashtagsField, validateHashtags, FORM_ERRORS.INCORRECT_HASHTAG);
pristine.addValidator(hashtagsField, validateHashtagCount, FORM_ERRORS.COUNT_EXCEEDED);

fileField.addEventListener('change', formFileIsSelectedHandler);
closeButton.addEventListener('click', closeForm);
scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
createSlider();

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  const activeEffect = form.querySelector('.effects__radio:checked').value;
  const effectParameters = EFFECTS[activeEffect];
  const value = unencoded[handle];
  effectLevelValue.value = value;
  const filterValue = `${effectParameters.filter}(${value}${effectParameters.unit})`;
  previewImage.style.filter = filterValue;
});

applyEffects();
