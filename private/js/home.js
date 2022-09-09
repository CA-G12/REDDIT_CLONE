const UserName = document.querySelector('.cur-user-name');
const userImage = document.querySelectorAll('.con-user-img');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search');
const dropdown = document.querySelector('.dropdown');
const dropDownBtn = document.querySelector('.icons-container');
const signBtns = document.querySelectorAll('.btn');
const createPostCon = document.querySelector('.create-post');
const createPostForm = document.querySelector('.create-post-form');
const postContentInput = document.querySelector('.post-content');
const postImageInput = document.querySelector('.image');
const hiddenForm = Array.from(document.querySelectorAll('.hidden-form'));
const cancelBtn = document.querySelector('.cancel');
const createPostBtn = document.querySelector('.create-post-btn');
const errorMessage = document.querySelector('.error-message');
const postsCon = document.querySelector('.posts-container');

const user = { info: {} };

fetch('/private/getUser', {
  method: 'get',
})
  .then((res) => res.json())
  .then((res) => {
    if (res.user) {
      user.info = res.user;
      UserName.textContent = res.user.username;
      userImage[0].style.backgroundImage = `url(${res.user.image})`;
      userImage[1].style.backgroundImage = `url(${res.user.image})`;
    } else if (res.path) {
      window.location.href = res.path;
    }
  })
  .catch((error) => {
    window.location.href = '/login';
  });

// ------------------------------------------------------------
fetch('/private/posts', {
  method: 'get',
})
  .then((res) => res.json())
  .then((res) => {
    if (res.posts) {
      // console.log(res.posts);
      res.posts.reverse().forEach((post) => {
        postsCon.appendChild(createPost(post));
      });
    } else if (res.path) {
      window.location.href = res.path;
    } else if (res.msg) {
      console.log(res.msg);
    }
  })
  .catch((error) => {
    window.location.href = '/login';
  });

// --------------------------Drop down menu ----------------------------------


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

// ------------------------------add post DOM---------------------------------------------------


postContentInput.addEventListener('focus', () => {
  showAddPostForm();
});

cancelBtn.addEventListener('click', () => {
  hideAddPostForm();
});

function showAddPostForm() {
  postContentInput.style.height = '80px';
  createPostForm.style.height = '230px';
  hiddenForm[0].style.display = 'block';
  hiddenForm[2].style.display = 'block';
  createPostCon.style.alignItems = 'start';
  createPostCon.style.padding = '20px 10px';
}

function hideAddPostForm() {
  postContentInput.style.height = '20px';
  createPostForm.style.height = 'auto';
  hiddenForm[0].style.display = 'none';
  hiddenForm[1].style.display = 'none';
  hiddenForm[2].style.display = 'none';
  createPostCon.style.alignItems = 'center';
  postContentInput.value = '';
  postImageInput.value = '';
}

// -------------------------handle share new post button------------------------------------

createPostBtn.addEventListener('click', () => {
  if (postContentInput.value) {
    fetch('/private/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: postContentInput.value,
        image: postImageInput.value,
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
          const tempPost = {
            id: res.post.id,
            content: res.post.content,
            post_img: res.post.image,
            time: res.post.time,
            username: user.info.username,
            user_img: user.info.image,
            vote: null,
          }
          postsCon.insertBefore(createPost(tempPost), postsCon.firstChild);
          hideAddPostForm();
        } else if (res.path) {
          window.location.href = res.path;
        }
      })
      .catch((error) => console.log(error));
  } else {
    errorMessage.textContent = "* You can't leave fields empty";
    errorMessage.style.display = 'block';
  }
});