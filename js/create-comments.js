import { createRandomId, getRandomArrayElement, getRandomInteger } from './util.js';

const minCommentID = 1;
const maxCommentID = 6;

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

const createStringAvatar = (id) => `img/avatar-${id}.svg`;

const generateCommentId = createRandomId(minCommentID, maxCommentID);
const generateIdAvatar = () => getRandomInteger(minCommentID, maxCommentID);

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
  const idAvatar = generateIdAvatar();
  const message = generateCommentText();
  return {
    id: id,
    avatar: createStringAvatar(idAvatar),
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

export { createComment };
