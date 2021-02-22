import refs from '../js/refs';
import queryTitle from '../templates/query-title.hbs';

function createTitle(query) {
    const title = queryTitle({ query });

    refs.title.innerHTML = '';
    refs.title.insertAdjacentHTML('afterbegin', title);
}

export default createTitle;