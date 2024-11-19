const templateThumbnail = document.querySelector('#picture').content;
const template = templateThumbnail.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');


const renderThumbnails = (photos) => {
  const templatesFragment = document.createDocumentFragment();
  photos.forEach(({url, description, likes, comments}) => {
    const thumbnail = template.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    templatesFragment.appendChild(thumbnail);
  });
  thumbnailsContainer.appendChild(templatesFragment);
};


export { renderThumbnails };
//На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

//Адрес изображения url подставьте как атрибут src изображения.
//Описание изображения description подставьте в атрибут alt изображения.
//Количество лайков likes выведите в блок .picture__likes.
//Количество комментариев comments выведите в блок .picture__comments.
//Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

//Подключите модуль в проект.
