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
  createPostForm.style.height = '230px';
  hiddenForm[0].style.display = 'block';
  hiddenForm[2].style.display = 'block';
  createPostCon.style.alignItems = 'start';
  createPostCon.style.padding = '20px 10px';
});

cancelBtn.addEventListener('click', () => {
  postContentInput.style.height = '20px';
  createPostForm.style.height = 'auto';
  hiddenForm[0].style.display = 'none';
  hiddenForm[1].style.display = 'none';
  hiddenForm[2].style.display = 'none';
  createPostCon.style.alignItems = 'center';
  postContentInput.value = '';
  postImageInput.value = '';
});

// -----------------------------------------------------------------------

const createPostBtn = document.querySelector('.create-post-btn');
const errorMessage = document.querySelector('.error-message');
const postsCon = document.querySelector('.posts-container');
const createPostDOM = require('./createPost');

createPostBtn.addEventListener('click', () => {
  if (postContentInput.value && postImageInput.value) {
    fetch('/private/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: postContentInput.value,
        password: postImageInput.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        if (res.err) {
          res.err.details.forEach((error) => {
            errorMessage.textContent += `*${error.message}\n`;
          });
          errorMessage.style.display = 'block';
        } else if (res.post) {
          postsCon.insertBefore(createPostDOM(res.post), postsCon.firstChild);
        }
      })
      .catch((error) => console.log(error));
  } else {
    errorMessage.textContent = "* You can't leave fields empty";
    errorMessage.style.display = 'block';
  }
});
