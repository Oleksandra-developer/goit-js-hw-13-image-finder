import './styles.css';
import SearchImages from './js/fetchAPI.js';
import galleryTpl from './templates/gallery.hbs';
import loadBtn from './js/loadBtn.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  resultContainer: document.querySelector('.result-container'),
};

const ApiSearchImages = new SearchImages();
const loadMoreBtn = new loadBtn({
  selector: '.btn_loading_js',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();
  ApiSearchImages.query = e.currentTarget.elements.query.value;
  if (ApiSearchImages.query === '') {
    loadMoreBtn.hide();
    // clearResultContainer();
    return alert('Request is incorrect');
  } else loadMoreBtn.show();
  ApiSearchImages.resetPage();
  clearResultContainer();
  fetchImages();
  scroll();
}

function fetchImages() {
  loadMoreBtn.disable();
  ApiSearchImages.fetchImages()
    .then(images => {
      appendImagesMarkup(images);
      loadMoreBtn.enable();
      scroll();
    })
    .catch(error => console.log(error));
}
function scroll() {
  window.scrollBy({
    top: 1300,
    behavior: 'smooth',
  });
}
function appendImagesMarkup(images) {
  refs.resultContainer.insertAdjacentHTML('beforeend', galleryTpl(images));
}

function clearResultContainer() {
  refs.resultContainer.innerHTML = '';
}
