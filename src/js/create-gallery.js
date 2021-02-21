import refs from '../js/refs';
import photoCard from '../templates/photo-card.hbs';

function createGallery({ data }) {
    const markup = photoCard(data.hits);

    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export default createGallery;