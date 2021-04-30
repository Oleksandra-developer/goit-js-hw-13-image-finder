const BASE_URL = 'https://pixabay.com/api/';
const AUTORISE_KEY = '21316838-7fcc910513b76d8c5d66b5ad0';

export default class ApiSearchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=${AUTORISE_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=12`;
    if (this.searchQuery === '') {
      return alert('Please, enter anything');
    } else
      return fetch(url)
        .then(response => {
          return response.json();
        })
        .then(({ hits }) => {
          this.incrementPage();
          if (hits.length !== 0) {
            return hits;
          } else return alert('Any results');
        })
        .catch(error => console.log(error));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
