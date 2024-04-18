import axios from 'axios';
import { renderErrorMessages } from './render-functions';
const KEY = '43388201-d3d6dfd281aefcb5631baa551';

const searchParams = new URLSearchParams({
  key: KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 200,
});

export default async function getImages(query, page = 1) {
  searchParams.set('q', query);
  searchParams.set('page', page);

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams.toString()}`
    );
    if (response.data.hits.length === 0) {
      renderErrorMessages(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    renderErrorMessages(err.message);
  }
}
