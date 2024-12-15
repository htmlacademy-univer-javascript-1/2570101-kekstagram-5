import { isEscapeKey } from './util.js';

const commentsOnEachDownload = 5;

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

let currentComments = [];
let displayedCommentsCount = 0;

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
};

const openBigPhoto = () => {
  bigPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.classList.add('modal-open');
  bigPhotoCommentsLoader.classList.remove('hidden');
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

const fillBigPhotoData = (data) => {
  if (data) {
    bigPhotoImg.src = data.url;
    bigPhotoImg.alt = data.description;
    bigPhotoDescription.textContent = data.description;
    bigPhotoSocial.textContent = data.likes;
    bigPhotoCountComments.textContent = data.comments.length;
  }
};

const createCommentElement = (comment) => {
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

  return commentElement;
};

const renderComments = (comments) => {
  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    bigPhotoCommentsList.appendChild(commentElement);
  });
  displayedCommentsCount += comments.length;
};

const checkLoaderVisibility = () => {
  if (displayedCommentsCount >= currentComments.length) {
    bigPhotoCommentsLoader.classList.add('hidden');
  }
};

const updateComments = () => {
  const commentsToShow = currentComments.slice(displayedCommentsCount, displayedCommentsCount + commentsOnEachDownload);
  renderComments(commentsToShow);
  bigPhotoCommentCounter.textContent = `${displayedCommentsCount} из ${currentComments.length} комментариев`;
  checkLoaderVisibility();
};

const fillBigPhotoComments = (data) => {
  currentComments = data.comments;
  displayedCommentsCount = 0;
  bigPhotoCommentsList.innerHTML = '';
  updateComments();
};

bigPhotoCommentsLoader.addEventListener('click', () => {
  updateComments();
});

const addThumbnailClickHandler = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const data = {
        url: thumbnail.dataset.url,
        likes: thumbnail.dataset.likes,
        comments: JSON.parse(thumbnail.dataset.comments),
        description: thumbnail.dataset.description
      };
      openBigPhoto();
      fillBigPhotoData(data);
      fillBigPhotoComments(data);
    });
  });
};

const addExitClickListener = () => {
  exit.addEventListener('click', () => {
    closeBigPhoto();
  });
};

export { addThumbnailClickHandler, addExitClickListener, closeBigPhoto };
