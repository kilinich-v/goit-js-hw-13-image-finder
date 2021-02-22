import './styles.scss';
import _ from 'lodash';
import notice from './js/notifications';
import refs from './js/refs';
import api from './js/apiService';
import createGallery from './js/create-gallery';
import createTitle from './js/create-title';
import modal from './js/modal';

refs.search.addEventListener('submit', handleQuery);
refs.gallery.addEventListener('click', handleModal);

function handleQuery(event) {
    event.preventDefault();

    api.clearGallery();
    api.query = event.target[0].value;


    if (!api.query) {
        createTitle(api.query);
        return;
    }

    api.getPhotos().then(photos => {
        createTitle(api.query);
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



