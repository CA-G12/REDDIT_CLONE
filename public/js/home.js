const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search');
const dropdown = document.querySelector('.dropdown');
const dropDownBtn = document.querySelector('.icons-container');
const signBtns = document.querySelectorAll('.btn');
const postsCon = document.querySelector('.posts-container');


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

fetch('/posts', {
  method: 'get',
})
  .then((res) => res.json())
  .then((res) => {
    if (res.posts) {
      console.log(res.posts);
      res.posts.reverse().forEach((post) => {
        postsCon.appendChild(createPost(post));
      });

      const upVotes = Array.from(document.querySelectorAll('.fa-light.fa-up'));
      const downVotes = Array.from(document.querySelectorAll('.fa-light.fa-down'));

      upVotes.forEach((upVoteBtn) => {
          upVoteBtn.addEventListener('click', (e) => {
          window.location.href = '/login';
        });
      });

      downVotes.forEach((downVoteBtn) => {
        downVoteBtn.addEventListener('click', (e) => {
          window.location.href = '/login';
        });
      });
    } else if (res.msg) {
      console.log(res.msg);
    }
  })
  .catch((error) => {
    console.log(error);
  });
