import {
  toggleLoader,
  renderGallery,
  createGalleryMarkup,
  renderErrorMessages,
  clearGallery,
} from './js/render-functions';

import getImages from './js/pixabay-api';

const formRef = document.querySelector('.search-form');
const input = formRef['input'];
const mainContainerRef = document.querySelector('.container');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.js-load-more');

async function handleSearchSubmit(e) {
  e.preventDefault();

  const query = input.value.trim().toLowerCase();

  if (!query) {
    renderErrorMessages('Please enter a search query.');
    return;
  }

  clearGallery(galleryRef);
  toggleLoader();

  const response = await getImages(query);
  renderGallery(
    response,
    mainContainerRef,
    galleryRef,
    createGalleryMarkup(response.hits)
  );

  loadMoreBtn.addEventListener('click', handleLoadMoreClick.bind(null, query));
}

async function handleLoadMoreClick(query, e) {
  e.preventDefault();
  toggleLoader();
  loadMoreBtn.setAttribute('hidden', '');
  let page = parseInt(loadMoreBtn.dataset.page) || 2;
  const response = await getImages(query, page);
  renderGallery(
    response,
    mainContainerRef,
    galleryRef,
    createGalleryMarkup(response.hits)
  );
  loadMoreBtn.removeAttribute('hidden');
  page += 1;
  loadMoreBtn.dataset.page = page;
}

formRef.addEventListener('submit', handleSearchSubmit);
