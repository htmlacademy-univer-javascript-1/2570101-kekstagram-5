const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Николай',
  'Глеб',
  'Виктор',
  'Елизавета',
  'Артем',
  'Иван',
  'Марина',
  'Антонина',
  'Валерия',
  'Анатолий'
];

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (min, max) => {
  const previousValues = [];
  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createStringAvatar = (id) => `img/avatar-${id}.svg`;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomId(1,100);
const generatePhotoId = createRandomId(1,25);

const generateCommentText = () => {
  const numberOfPhrases = getRandomInteger(1,2);
  const phrases = [];
  for (let i = 0; i < numberOfPhrases; i ++) {
    phrases.push(getRandomArrayElement(MESSAGES));
  }
  return phrases.join(' ');
};

const createComment = () => {
  const id = generateCommentId();
  const message = generateCommentText();
  return {
    id: id,
    avatar: createStringAvatar(id),
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

const createDescriptionPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, () => createComment()),
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

const descriptionsPhotos = createPhotosArray(25);

// eslint-disable-next-line no-console
console.log(descriptionsPhotos);

