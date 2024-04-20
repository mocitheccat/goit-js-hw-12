import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import apiRequest from './pixabay-api';
import messages from './messages-to-user';

const lightboxOptions = {
  captions: true,
  captionSelector: '.image',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};
const lightbox = new SimpleLightbox('.img-link', lightboxOptions);

const api = new apiRequest();

export function createGalleryMarkup(imgs) {
  return imgs
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="image-card">
          <a class="img-link" href=${largeImageURL}>
            <div class="gallery-image">
              <img class="image" src=${webformatURL} alt="${tags}">
            </div>
            <div class="img-caption">
                <ul class="img-stats">
                    <li class="stat-item">
                        <p class="stat-name">Likes</p>
                        <span>${likes}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Views</p>
                        <span>${views}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Comments</p>
                        <span>${comments}</span>
                    </li>
                    <li class="stat-item">
                        <p class="stat-name">Downloads</p>
                        <span>${downloads}</span>
                    </li>
                </ul>
            </div>
              </a>
         </li>`
    )
    .join('');
}
function renderGallery(galleryRef, markup) {
  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export async function getImgsGallery({ galleryRef, query, paginBtn, loader }) {
  clearGallery(galleryRef);
  api.query = query;
  if (!query) {
    throw new Error(messages.emptyInput);
  }
  changeVisibility(paginBtn, false);
  try {
    changeVisibility(loader, true);
    const imgsHits = await api.getImagesHits();
    changeVisibility(loader, false);
    renderGallery(galleryRef, createGalleryMarkup(imgsHits));
    changeVisibility(paginBtn, true) && api.totalPages > 1;
  } catch (err) {
    changeVisibility(paginBtn, false);
    changeVisibility(loader, false);
    renderMessages(err.message);
  }
}

export async function addImagesToGallery({ galleryRef, paginBtn, loader }) {
  api.currentPage += 1;
  changeVisibility(loader, true);
  changeVisibility(paginBtn, false);
  try {
    const imgsHits = await api.getImagesHits();
    changeVisibility(loader, false);
    renderGallery(galleryRef, createGalleryMarkup(imgsHits));
    changeVisibility(paginBtn, true) && api.currentPage < api.totalPages;
    scroll(document.querySelector('.image-card'));
    if (api.totalPages === api.currentPage) {
      throw new Error(messages.endOfResults);
    }
  } catch (err) {
    changeVisibility(paginBtn, false);
    changeVisibility(loader, false);
    renderMessages(err.message);
  }
}

function scroll(imgCard) {
  window.scrollBy({
    top: imgCard.getBoundingClientRect().height * 2,
    behavior: 'smooth',
  });
}

export function clearGallery(galleryRef) {
  galleryRef.innerHTML = '';
}

export function renderMessages(errorMessage) {
  let options = {
    message: errorMessage,
    position: 'topRight',
  };

  switch (errorMessage) {
    case messages.endOfResults:
      options.progressBar = false;
      options.transitionIn = 'fadeIn';
      iziToast.info(options);
      break;
    case messages.emptyInput:
      iziToast.warning(options);
      break;
    case messages.noResults:
      iziToast.error(options);
      break;
    default:
      iziToast.warning(options);
  }
}

export function changeVisibility(HTMLElement, visibility) {
  visibility === false
    ? HTMLElement.classList.add('hidden')
    : HTMLElement.classList.remove('hidden');
}
