import getRefs from './get-refs';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '31600135-5645a7576922c275040b0e37d';

export default class ImagesApiService {
  constructor(perPage = 40, searchQuery = '') {
    this.searchQuery = searchQuery;
    this.page = 1;
    this.perPage = perPage;
  }

  async fetchImages() {
    const URL = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;
    const response = await axios.get(URL);

    const { totalHits, hits } = response.data;

    this.page += 1;

    return { totalHits, hits };
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    return (this.searchQuery = newSearchQuery);
  }
}
