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
            return await axios.get(`/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`);
        } catch (err) {
            throw err;
        }

    },

    clearGallery() {
        refs.gallery.innerHTML = '';
        refs.gallery.append(this.observerTarget);
    },

    observeGallery() {
        const options = {
            rootMargin: '200px',
        }

        const io = new IntersectionObserver((entries, observer) => {
            if (!entries.some(entry => entry.isIntersecting)) {
                return;
            }
            this.nextPage();
            this.getPhotos().then(createGallery).catch(err => {
                if (err.isAxiosError) {
                    observer.disconnect();
                }
            });
            refs.gallery.append(this.observerTarget);
        }, options);
        io.observe(this.observerTarget);
    },
}