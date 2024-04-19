import {
  getImgsGallery,
  addImagesToGallery,
  renderMessages,
} from './js/render-functions';

const formRef = document.querySelector('.search-form');
const input = formRef['input'];
// const mainContainerRef = document.querySelector('.container');
const galleryRef = document.querySelector('.gallery');
const paginBtn = document.querySelector('.js-load-more');
const loader = document.querySelector('.loader');

formRef.addEventListener('submit', handleSearchSubmit);

paginBtn.addEventListener('click', handleLoadMore);
const options = { galleryRef, query: '', paginBtn, loader };

async function handleSearchSubmit(e) {
  e.preventDefault();
  try {
    options.query = input.value.trim().toLowerCase();
    await getImgsGallery(options);
  } catch (err) {
    renderMessages(err.message);
    console.log(err);
  }
}

async function handleLoadMore(e) {
  e.preventDefault();
  try {
    await addImagesToGallery(options);
  } catch (err) {
    renderMessages(err.message);
    console.log(err);
  }
}
