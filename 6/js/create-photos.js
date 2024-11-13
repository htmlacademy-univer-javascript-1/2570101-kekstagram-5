import { createRandomId, getRandomArrayElement, getRandomInteger } from './util.js';
import { createComment } from './create-comments.js';

const minPhotoID = 1;
const maxPhotoID = 25;
const minCountLikes = 15;
const maxCountLikes = 200;
const minCountComments = 0;
const maxCountComments = 30;

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3'
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

export { createPhotosArray };
