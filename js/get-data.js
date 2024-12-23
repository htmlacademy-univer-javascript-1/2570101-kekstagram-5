import { getData } from './api.js';
import { renderThumbnails } from './rendering-thumbnails.js';
import { addThumbnailClickHandler } from './rendering-image.js';
import { initFilters } from './filter.js';

const imgFiltersElement = document.querySelector('.img-filters');

let originalPhotos = [];
let randomPhotos = [];

const fetchAndRenderData = () => {
  getData()
    .then((descriptionsPhotos) => {
      originalPhotos = descriptionsPhotos;
      randomPhotos = [...originalPhotos];
      renderThumbnails(descriptionsPhotos, addThumbnailClickHandler);
      imgFiltersElement.classList.remove('img-filters--inactive');
      initFilters(originalPhotos, randomPhotos, renderThumbnails, addThumbnailClickHandler);
    })
    .catch(() => {
      const errorMessageElement = document.querySelector('.data-error');
      if (!errorMessageElement) {
        const newErrorMessageElement = document.createElement('div');
        newErrorMessageElement.classList.add('data-error');
        document.body.appendChild(newErrorMessageElement);
      }
    });
};

export { fetchAndRenderData };
