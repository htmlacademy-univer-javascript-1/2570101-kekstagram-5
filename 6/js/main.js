import { createPhotosArray } from './create-photos.js';
import { renderThumbnails } from './rendering-thumbnails.js';

const countPhotos = 25;

const descriptionsPhotos = createPhotosArray(countPhotos);
renderThumbnails(descriptionsPhotos);
// eslint-disable-next-line no-console
console.log(descriptionsPhotos);
