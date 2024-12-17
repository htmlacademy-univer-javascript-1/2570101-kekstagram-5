const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const updateScale = (value) => {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const resetScale = () => updateScale(DEFAULT_SCALE);


const scaleControlClickHandler = (isIncrease) => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  currentScale = isIncrease ? Math.min(currentScale + SCALE_STEP, MAX_SCALE) : Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  updateScale(currentScale);
};

export { resetScale, scaleControlClickHandler };
