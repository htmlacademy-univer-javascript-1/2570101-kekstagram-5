import { createRandomId, getRandomArrayElement, getRandomInteger } from './util.js';

const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 6;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
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

const createStringAvatar = (id) => `img/avatar-${id}.svg`;

const generateCommentId = createRandomId(MIN_COMMENT_ID, MAX_COMMENT_ID);
const generateIdAvatar = () => getRandomInteger(MIN_COMMENT_ID, MAX_COMMENT_ID);

const generateCommentText = () => {
  const numberOfPhrases = getRandomInteger(1,2);
  const phrases = [];
  for (let i = 0; i < numberOfPhrases; i ++) {
    phrases.push(getRandomArrayElement(messages));
  }
  return phrases.join(' ');
};

const createComment = () => {
  const id = generateCommentId();
  const idAvatar = generateIdAvatar();
  const message = generateCommentText();
  return {
    id: id,
    avatar: createStringAvatar(idAvatar),
    message: message,
    name: getRandomArrayElement(names),
  };
};

export { createComment };
