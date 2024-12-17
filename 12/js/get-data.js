import { getData } from './api.js';
import { renderThumbnails } from './rendering-thumbnails.js';
import { addThumbnailClickHandler, addExitClickListener } from './rendering-image.js';
import { initFilters } from './filter.js';

const errorMessageElement = document.querySelector('.error-message');
const imgFiltersElement = document.querySelector('.img-filters');

let originalPhotos = [];
let randomPhotos = [];

const fetchAndRenderData = () => {
  getData()
    .then((descriptionsPhotos) => {
      originalPhotos = descriptionsPhotos;
      randomPhotos = [...originalPhotos];
      renderThumbnails(descriptionsPhotos, addThumbnailClickHandler);
      addExitClickListener();
      imgFiltersElement.classList.remove('img-filters--inactive');
      initFilters(originalPhotos, randomPhotos, renderThumbnails, addThumbnailClickHandler);
    })
    .catch(() => {
      errorMessageElement.classList.remove('hidden');
    });
};

export { fetchAndRenderData };
