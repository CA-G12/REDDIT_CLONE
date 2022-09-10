const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search');
const dropdown = document.querySelector('.dropdown');
const dropDownBtn = document.querySelector('.icons-container');
const signBtns = document.querySelectorAll('.btn');

searchContainer.addEventListener('click', () => {
  searchContainer.style.border = '1px solid #0079d3';
  searchInput.focus();
});

searchInput.addEventListener('blur', () => {
  searchContainer.style.border = '0.1px solid #c1c0c02f';
});

dropDownBtn.addEventListener('click', () => {
  dropdown.classList.toggle('active');
});

window.addEventListener('click', (e) => {
  if (!e.target.parentElement.matches('.icons-container')) {
    dropdown.classList.remove('active');
  }
});

Array.from(signBtns).forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.target.children[0].click();
  });
});
