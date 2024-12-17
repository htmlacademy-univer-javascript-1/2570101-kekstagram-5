import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const COUNT_RANDOM_PHOTOS = 10;

const filterButtons = document.querySelectorAll('.img-filters__button');

const setFilterClickHandler = (cb) => {
  filterButtons.forEach((filterButton) => filterButton.addEventListener('click', (evt) => {
    const filterId = evt.target.id;
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    cb(filterId);
  }));
};

const getRandomPhotos = (photos) => {
  const shuffled = photos.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, COUNT_RANDOM_PHOTOS);
};

const getDiscussedPhotos = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filterId, originalPhotos, randomPhotos, renderThumbnails, addThumbnailClickHandler) => {
  let filteredPhotos = [];
  switch (filterId) {
    case 'filter-default':
      filteredPhotos = [...originalPhotos];
      break;
    case 'filter-random':
      filteredPhotos = getRandomPhotos(randomPhotos);
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos(originalPhotos);
      break;
    default:
      filteredPhotos = [...originalPhotos];
  }
  renderThumbnails(filteredPhotos, addThumbnailClickHandler);
};

const initFilters = (originalPhotos, randomPhotos, renderThumbnails, addThumbnailClickHandler) => {
  const debouncedApplyFilter = debounce((filterId) => applyFilter(filterId, originalPhotos, randomPhotos, renderThumbnails, addThumbnailClickHandler), RERENDER_DELAY);
  setFilterClickHandler(debouncedApplyFilter);
};

export { initFilters };
