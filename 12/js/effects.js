import { resetScale } from './scale.js';

const Effects = {
  none: { range: { min: 0, max: 1 }, start: 1, step: 0.1, hideSlider: true },
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'grayscale', hideSlider: false },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'sepia', hideSlider: false },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1, unit: '%', filter: 'invert', hideSlider: false },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1, unit: 'px', filter: 'blur', hideSlider: false },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1, unit: '', filter: 'brightness', hideSlider: false },
};

const form = document.querySelector('.img-upload__form');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderContainerElement = form.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsButtons = document.querySelectorAll('.effects__radio');
const originalEffectButton = document.querySelector('#effect-none');

const toggleSliderVisibility = (isVisible) => {
  sliderContainerElement.classList.toggle('hidden', !isVisible);
};

const createSlider = () => {
  toggleSliderVisibility(false);
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {
      range: Effects.none.range,
      start: Effects.none.start,
      step: Effects.none.step,
      connect: 'lower',
    });
  }
};

const setEffect = (effect) => {
  const effectParameters = Effects[effect];

  if (effectParameters.hideSlider) {
    toggleSliderVisibility(false);
    previewImage.style.filter = '';
    sliderElement.noUiSlider.set(Effects.none.start);
  } else {
    toggleSliderVisibility(true);

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
  toggleSliderVisibility(false);
};

const setupSliderUpdate = () => {
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const activeEffect = form.querySelector('.effects__radio:checked').value;
    const effectParameters = Effects[activeEffect];
    const value = unencoded[handle];
    effectLevelValue.value = value;
    const filterValue = `${effectParameters.filter}(${value}${effectParameters.unit})`;
    previewImage.style.filter = filterValue;
  });
};

export { createSlider, applyEffects, resetEffects, setupSliderUpdate };
