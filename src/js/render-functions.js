import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getImages from './pixabay-api';

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

export function renderGallery(response, containerRef, galleryRef, markup) {
  console.dir(containerRef);
  toggleLoader();
  galleryRef.insertAdjacentHTML('beforeend', markup);

  const lightboxOptions = {
    captions: true,
    captionSelector: '.image',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  };

  const imgsCard = containerRef.querySelectorAll('.image-card');
  console.log(imgsCard.length);
  if (imgsCard.length < response.totalHits) {
    containerRef.lastElementChild.removeAttribute('hidden');
  } else {
    containerRef.lastElementChild.setAttribute('hidden', '');
  }
  const lightbox = new SimpleLightbox('.img-link', lightboxOptions);
  lightbox.refresh();
}

export function clearGallery(galleryRef) {
  galleryRef.innerHTML = '';
}

export function renderErrorMessages(errorMessage) {
  iziToast.error({
    message: errorMessage,
    position: 'topRight',
  });
}

export function toggleLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('disabled');
}
