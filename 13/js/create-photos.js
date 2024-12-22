import { createRandomId, getRandomArrayElement, getRandomInteger } from './util.js';
import { createComment } from './create-comments.js';

const COUNT_PHOTOS = 25;
const MIN_PHOTO_ID = 1;
const MAX_PHOTO_ID = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;

const descriptions = [
  'Все хорошо',
  'Доброе утро!',
  'Люблю это фото'
];

const generatePhotoId = createRandomId(MIN_PHOTO_ID, MAX_PHOTO_ID);

const createDescriptionPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS) }, () => createComment()),
});

const createPhotosArray = (numberOfPhotos) => {
  const photos = [];

  for (let i = 1; i <= numberOfPhotos; i++) {
    const id = generatePhotoId();
    if (id !== null) {
      photos.push(createDescriptionPhoto(id));
    }
  }
  return photos;
};

const descriptionsPhotos = createPhotosArray(COUNT_PHOTOS);

export { descriptionsPhotos };
