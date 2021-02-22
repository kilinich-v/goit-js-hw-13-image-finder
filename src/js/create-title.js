import refs from '../js/refs';
import queryTitle from '../templates/query-title.hbs';
import voidTitle from '../templates/query-void.hbs';

function createTitle(query) {
    let title = null;

    if (!query) {
        title = voidTitle();
    } else {
        title = queryTitle({ query });
    }

    refs.title.innerHTML = '';
    refs.title.insertAdjacentHTML('afterbegin', title);
}

export default createTitle;