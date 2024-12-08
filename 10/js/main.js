import { descriptionsPhotos } from './create-photos.js';
import { renderThumbnails } from './rendering-thumbnails.js';
import { addThumbnailClickHandler, addExitClickListener } from './rendering-image.js';
import './form.js';

renderThumbnails(descriptionsPhotos);
addThumbnailClickHandler();
addExitClickListener();
