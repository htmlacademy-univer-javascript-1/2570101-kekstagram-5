import { isEscapeKey } from './util.js';
const bodyElement = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const exit = document.querySelector('.big-picture__cancel');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img img');
const bigPhotoSocial = bigPhoto.querySelector('.likes-count');
const bigPhotoCountComments = bigPhoto.querySelector('.comments-count');
const bigPhotoCommentsList = bigPhoto.querySelector('.social__comments');
const bigPhotoDescription = bigPhoto.querySelector('.social__caption');
const bigPhotoCommentCounter = bigPhoto.querySelector('.social__comment-count');
const bigPhotoCommentsLoader = bigPhoto.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPhoto();
  }
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
};


const openBigPhoto = () => {
  bigPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPhotoCommentsLoader.classList.add('hidden');
  bigPhotoCommentCounter.classList.add('hidden');
  bodyElement.classList.add('modal-open');
};

const fillBigPhotoData = (data) => {
  bigPhotoImg.src = data.querySelector('.picture__img').src;
  bigPhotoImg.alt = data.querySelector('.picture__img').alt;
  bigPhotoDescription.textContent = data.querySelector('.picture__img').alt;
  bigPhotoSocial.textContent = data.querySelector('.picture__likes').textContent;
  bigPhotoCountComments.textContent = data.querySelector('.picture__comments').textContent;
};

const fillBigPhotoComments = (data) => {
  bigPhotoCommentsList.innerHTML = '';
  data.comm.forEach((comment) => {
    const commentElement = document.createElement('li');

    commentElement.classList.add('social__comment');
    const imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = comment.avatar;
    imgElement.alt = comment.name;
    imgElement.width = 35;
    imgElement.height = 35;
    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = comment.message;

    commentElement.appendChild(imgElement);
    commentElement.appendChild(textElement);
    bigPhotoCommentsList.appendChild(commentElement);
  });
};

const addThumbnailClickHandler = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      openBigPhoto();
      fillBigPhotoData(thumbnail);
      fillBigPhotoComments(thumbnail);
    });
  });
};

const addExitClickerHandler = () => {
  exit.addEventListener('click', () => {
    closeBigPhoto();
  });
};


export { addThumbnailClickHandler, addExitClickerHandler, fillBigPhotoComments, fillBigPhotoData };
