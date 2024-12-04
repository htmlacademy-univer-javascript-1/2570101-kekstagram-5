import { createPhotosArray } from './create-photos.js';
import { renderThumbnails } from './rendering-thumbnails.js';
import { addThumbnailClickHandler, addExitClickerHandler } from './rendering-image.js';
import './form.js';

const countPhotos = 25;

const descriptionsPhotos = createPhotosArray(countPhotos);
renderThumbnails(descriptionsPhotos);
addThumbnailClickHandler();
addExitClickerHandler();
// eslint-disable-next-line no-console
console.log(descriptionsPhotos);
