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
  })
});

// ---------------------------------------------------------------------------------

const createPostCon = document.querySelector('.create-post');
const createPostForm = document.querySelector('.create-post-form');
const postContentInput = document.querySelector('.post-content');
const postImageInput = document.querySelector('.image');
const hiddenForm = Array.from(document.querySelectorAll('.hidden-form'));
const cancelBtn = document.querySelector('.cancel');

postContentInput.addEventListener('focus', () => {
  postContentInput.style.height = '80px';
  createPostForm.style.height = '200px';
  hiddenForm[0].style.display = 'block';
  hiddenForm[1].style.display = 'block';
  createPostCon.style.alignItems = 'start';
});

cancelBtn.addEventListener('click', () => {
  postContentInput.style.height = '20px';
  createPostForm.style.height = 'auto';
  hiddenForm[0].style.display = 'none';
  hiddenForm[1].style.display = 'none';
  createPostCon.style.alignItems = 'center';
  postContentInput.value = '';
  postImageInput.value = '';
});