import axios from 'axios';
import {refs} from './js/refs';
import { fetchImages, PAGE_SIZE } from './js/fetch-img';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export let currentPage = 1;

refs.form.addEventListener('submit', handleSearchImages);
refs.loadMoreBtn.addEventListener('click', handleSearchImages);

function handleSearchImages(e) {
    e.preventDefault();
    if (refs.input.value.length === 0) {
            return;
    }
    
    fetchImages()
        .then(data => {
            if (data.hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            }
            refs.loadMoreBtn.classList.remove('hide');
            currentPage += 1;
        
            if (currentPage > Math.ceil(data.totalHits / PAGE_SIZE)) {
                refs.loadMoreBtn.classList.add('hide');
                Notify.failure("We're sorry, but you've reached the end of search results.");
                currentPage = 1;
            }
            const marKup = createMarKupGallery(data.hits);
            if (e.type === 'submit') {
                refs.gallery.innerHTML = marKup;
                return;
            }
            refs.gallery.insertAdjacentHTML('beforeend', marKup);
        })
        .catch(error => console.log(error))
};

function marKupGallery({likes, views, comments, downloads, webformatURL, tags}) {
     const marKup = `<div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div>`;
    return marKup;
};

function createMarKupGallery(data) {
   return data.reduce((acc, item) => acc + marKupGallery(item) ,'')
};


