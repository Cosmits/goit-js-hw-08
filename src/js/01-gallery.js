// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryUlEl = document.querySelector('.gallery');
galleryUlEl.insertAdjacentHTML('beforeend', doGalleryList(galleryItems));

// Initialize SimpleLightbox
const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    animationSpeed: 250,
});

//
//~ any functions 
//
function doGalleryList(arrGalleryItems) {
    return arrGalleryItems.map(({ preview, original, description }) => {
        //const { preview, origin, description } = el;
        return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                alt="${description}"
            />
        </a>
    </li>`
    }).join('');
}

