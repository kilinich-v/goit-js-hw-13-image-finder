import axios from 'axios';
import refs from '../js/refs';
import createGallery from '../js/create-gallery';
import _ from 'lodash';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default {
    querySearch: '',
    page: 1,
    apiKey: '2778632-0d9f36dba3e3cb8ecea612bcf',
    observerTarget: refs.sentinel,

    get query() {
        return this.querySearch;
    },

    set query(newQuery) {
        this.querySearch = newQuery;
    },

    nextPage() {
        this.page += 1;
    },

    resetPage() {
        this.page = 1;
    },

    async getPhotos() {
        try {
            if (!this.query) {
                return;
            }
            return await axios.get(`/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`);
        } catch (err) {
            throw err;
        }

    },

    clearGallery() {
        this.resetPage();
        refs.gallery.innerHTML = '';
        refs.gallery.append(this.observerTarget);
    },

    observeGallery() {
        const io = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                this.nextPage();
                this.getPhotos().then(createGallery).catch(err => {
                    observer.disconnect();
                });
                refs.gallery.append(this.observerTarget);
            }
        });

        io.observe(this.observerTarget);
    },
}