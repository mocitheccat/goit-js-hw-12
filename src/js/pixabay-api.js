import axios from 'axios';
const KEY = '43388201-d3d6dfd281aefcb5631baa551';
import messages from './messages-to-user';
// axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class apiRequest {
  BASE_URL = 'https://pixabay.com/api/';
  currentPage = 1;
  resultsPerPage = 15;
  totalPages = 0;
  query = '';

  async getImagesHits() {
    const searchParams = {
      params: {
        key: KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.currentPage,
        per_page: this.resultsPerPage,
      },
    };
    try {
      const response = await axios.get(this.BASE_URL, searchParams);
      this.totalPages = Math.ceil(
        response.data.totalHits / this.resultsPerPage
      );
      if (response.data.hits.length === 0) {
        throw new Error(messages.noResults);
      }
      return response.data.hits;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
