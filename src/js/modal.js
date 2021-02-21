import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

function modal(url) {
    return basicLightbox.create(`<img src="${url}">`);
}

export default modal;