import { getData } from './api.js';
import { renderThumbnails } from './rendering-thumbnails.js';
import { addThumbnailClickHandler, addExitClickListener } from './rendering-image.js';

const errorMessageElement = document.querySelector('.error-message');

const fetchAndRenderData = () => {
  getData()
    .then((descriptionsPhotos) => {
      renderThumbnails(descriptionsPhotos);
      addThumbnailClickHandler();
      addExitClickListener();
    })
    .catch(() => {
      errorMessageElement.classList.remove('hidden');
    });
};

export { fetchAndRenderData };
