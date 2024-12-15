import { createRandomId, getRandomArrayElement, getRandomInteger } from './util.js';
import { createComment } from './create-comments.js';

const COUNT_PHOTOS = 25;
const minPhotoID = 1;
const maxPhotoID = 25;
const minCountLikes = 15;
const maxCountLikes = 200;
const minCountComments = 0;
const maxCountComments = 30;

const DESCRIPTIONS = [
  'Все хорошо',
  'Доброе утро!',
  'Люблю это фото'
];

const generatePhotoId = createRandomId(minPhotoID, maxPhotoID);

const createDescriptionPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(minCountLikes, maxCountLikes),
  comments: Array.from({ length: getRandomInteger(minCountComments, maxCountComments) }, () => createComment()),
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
