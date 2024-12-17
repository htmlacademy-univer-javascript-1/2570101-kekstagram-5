//import { descriptionsPhotos } from './create-photos.js';
//import { renderThumbnails } from './rendering-thumbnails.js';
//import { addThumbnailClickHandler, addExitClickListener } from './rendering-image.js';
import './form.js';
import { setUserFormSubmit } from './form.js';
import { closeBigPhoto } from './rendering-image.js';
import { fetchAndRenderData } from './get-data.js';

fetchAndRenderData();
setUserFormSubmit(closeBigPhoto);
