const templateThumbnail = document.querySelector('#picture').content;
const template = templateThumbnail.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');


const renderThumbnails = (photos, onThumbnailClick) => {
  const templatesFragment = document.createDocumentFragment();
  photos.forEach(({url, likes, comments, description}) => {
    const thumbnail = template.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.dataset.url = url;
    thumbnail.dataset.likes = likes;
    thumbnail.dataset.comments = JSON.stringify(comments);
    thumbnail.dataset.description = description;

    thumbnail.querySelector('.picture__img').addEventListener('click', () => onThumbnailClick({url, likes, comments, description}));
    templatesFragment.appendChild(thumbnail);
  });
  thumbnailsContainer.appendChild(templatesFragment);
};

export { renderThumbnails };


