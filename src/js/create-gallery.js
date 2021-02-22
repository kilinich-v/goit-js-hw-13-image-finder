import refs from '../js/refs';
import photoCard from '../templates/photo-card.hbs';
import queryTitle from '../templates/query-title.hbs';

function createGallery({ data }) {
    const markup = photoCard(data.hits);

    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export default createGallery;