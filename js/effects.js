const Effect = {
  NONE: { range: { min: 0, max: 1 }, start: 1, step: 0.1, hideSlider: true },
  CHROME: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'grayscale', hideSlider: false },
  SEPIA: { range: { min: 0, max: 1 }, start: 1, step: 0.1, unit: '', filter: 'sepia', hideSlider: false },
  MARVIN: { range: { min: 0, max: 100 }, start: 100, step: 1, unit: '%', filter: 'invert', hideSlider: false },
  PHOBOS: { range: { min: 0, max: 3 }, start: 3, step: 0.1, unit: 'px', filter: 'blur', hideSlider: false },
  HEAT: { range: { min: 1, max: 3 }, start: 3, step: 0.1, unit: '', filter: 'brightness', hideSlider: false },
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
      range: Effect.NONE.range,
      start: Effect.NONE.start,
      step: Effect.NONE.step,
      connect: 'lower',
    });
  }
};

const setEffect = (effect) => {
  const effectParameters = Effect[effect.toUpperCase()];

  if (effectParameters && effectParameters.hideSlider) {
    toggleSliderVisibility(false);
    previewImage.style.filter = '';
    sliderElement.noUiSlider.set(Effect.NONE.start);
  } else if (effectParameters) {
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
  effectLevelValue.value = effectParameters ? effectParameters.start : '';
};

const applyEffects = () => {
  effectsButtons.forEach((button) => {
    const changeHandler = (evt) => {
      const effect = evt.target.value;
      setEffect(effect);
    };
    button.changeHandler = changeHandler;
    button.addEventListener('change', changeHandler);
  });
};

const removeEffectsChangeHandlers = () => {
  effectsButtons.forEach((button) => {
    if (button.changeHandler) {
      button.removeEventListener('change', button.changeHandler);
    }
  });
};

const resetEffects = () => {
  originalEffectButton.checked = true;
  previewImage.style.filter = '';
  toggleSliderVisibility(false);
};

const setupSliderUpdate = () => {
  const updateHandler = (_, handle, unencoded) => {
    const activeEffect = form.querySelector('.effects__radio:checked').value;
    const effectParameters = Effect[activeEffect.toUpperCase()];
    const value = unencoded[handle];
    effectLevelValue.value = value;

    if (effectParameters && effectParameters.filter) {
      const filterValue = `${effectParameters.filter}(${value}${effectParameters.unit})`;
      previewImage.style.filter = filterValue;
    }
  };
  sliderElement.noUiSlider.on('update', updateHandler);
  sliderElement.updateHandler = updateHandler;
};

const removeSliderUpdateHandler = () => {
  if (sliderElement.updateHandler) {
    sliderElement.noUiSlider.off('update', sliderElement.updateHandler);
  }
};

export { createSlider, applyEffects, removeEffectsChangeHandlers, removeSliderUpdateHandler, resetEffects, setupSliderUpdate };
