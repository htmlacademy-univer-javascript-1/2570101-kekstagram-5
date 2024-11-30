const templateThumbnail = document.querySelector('#picture').content;
const template = templateThumbnail.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');


const renderThumbnails = (photos, onThumbnailClick) => {
  const templatesFragment = document.createDocumentFragment();
  photos.forEach(({url, description, likes, comments}) => {
    const thumbnail = template.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.comm = comments;

    thumbnail.querySelector('.picture__img').addEventListener('click', () => onThumbnailClick({url, description, likes, comments}));
    templatesFragment.appendChild(thumbnail);
  });
  thumbnailsContainer.appendChild(templatesFragment);
};


export { renderThumbnails };
