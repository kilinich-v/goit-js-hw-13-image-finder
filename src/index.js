import './styles.scss';
import _ from 'lodash';
import notice from './js/notifications';
import refs from './js/refs';
import api from './js/apiService';
import createGallery from './js/create-gallery';
import modal from './js/modal';

refs.search.addEventListener('input', _.debounce(handleQuery, 1000));
refs.gallery.addEventListener('click', handleModal);

function handleQuery(event) {
    api.query = event.target.value;
    api.resetPage();
    // if (!api.query) {
    //     api.clearGallery();
    //     notice();
    //     return;
    // }
    api.clearGallery();
    api.getPhotos().then(photos => {
        api.nextPage();
        createGallery(photos);
        api.observeGallery();
    });
}

function handleModal(event) {
    const currentTarget = event.target;

    if (currentTarget.nodeName === 'IMG') {
        modal(currentTarget.dataset.source).show();
    }
}



