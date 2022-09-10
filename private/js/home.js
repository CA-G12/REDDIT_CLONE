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
      res.posts.reverse().forEach((post) => {
        postsCon.appendChild(createPost(post));
      });

      const upVotes = Array.from(document.querySelectorAll('.fa-light.fa-up'));
      const downVotes = Array.from(document.querySelectorAll('.fa-light.fa-down'));
      const checkedUpVotes = Array.from(document.querySelectorAll('.fa-solid.fa-up'));
      const checkedDownVotes = Array.from(document.querySelectorAll('fa-solid.fa-down'));

      upVotes.forEach((upVoteBtn) => {
        upVoteBtn.addEventListener('click', (e) => {
          addUpVote(e.target.parentElement.parentElement, e.target);
        });
      });

      downVotes.forEach((downVoteBtn) => {
        downVoteBtn.addEventListener('click', (e) => {
          addDownVote(e.target.parentElement.parentElement, e.target);
        });
      });

      checkedUpVotes.forEach((upVoteBtn) => {
        upVoteBtn.addEventListener('click', (e) => {
          removeVote(e.target.parentElement.parentElement, e.target);
        });
      });

      checkedDownVotes.forEach((downVoteBtn) => {
        downVoteBtn.addEventListener('click', (e) => {
          removeVote(e.target.parentElement.parentElement, e.target);
        });
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

function addUpVote(postELe, btn) {
  fetch('/private/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: postELe.dataset.id,
      vote: true,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.err) {
        console.log('Invalid', res.err);
      } else if (res.votes) {
        btn.nextElementSibling.textContent = res.votes.post_votes;
        addClickStyle(btn);
        if (btn.nextElementSibling.nextElementSibling.classList.contains('fa-solid')) {
          removeClickStyle(btn.nextElementSibling.nextElementSibling);
        }
      } else if (res.path) {
        window.location.href = res.path;
      }
    })
    .catch((error) => console.log(error));
}

function addDownVote(postELe, btn) {
  fetch('/private/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: postELe.dataset.id,
      vote: false,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.err) {
        console.log('Invalid', res.err);
      } else if (res.votes) {
        btn.previousElementSibling.textContent = res.votes.post_votes;
        addClickStyle(btn);
        if (btn.previousElementSibling.previousElementSibling.classList.contains('fa-up')) {
          removeClickStyle(btn.previousElementSibling.previousElementSibling);
        }
      } else if (res.path) {
        window.location.href = res.path;
      }
    })
    .catch((error) => console.log(error));
}
function removeVote(postELe, btn) {
  fetch('/private/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: postELe.dataset.id,
      vote: null,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.err) {
        console.log('Invalid', res.err);
      } else if (res.votes) {
        if (btn.classList.contains('fa-up')) {
          btn.nextElementSibling.textContent = res.votes.post_votes;
        } else {
          btn.previousElementSibling.textContent = res.votes.post_votes;
        }
        removeClickStyle(btn);
      } else if (res.path) {
        window.location.href = res.path;
      }
    })
    .catch((error) => console.log(error));
}

function addClickStyle(ele) {
  ele.classList.remove('fa-light');
  ele.classList.add('fa-solid');

  ele.addEventListener('click', (e) => {
    removeVote(e.target.parentElement.parentElement, e.target);
  });
}

function removeClickStyle(ele) {
  ele.classList.remove('fa-solid');
  ele.classList.add('fa-light');

  // ele.removeEventListener('click', (e) => {
  //   removeVote(e.target.parentElement.parentElement, e.target);
  // });

  if (ele.classList.contains('fa-up')) {
    ele.addEventListener('click', (e) => {
      addUpVote(e.target.parentElement.parentElement, e.target);
    });
  } else {
    ele.addEventListener('click', (e) => {
      removeVote(e.target.parentElement.parentElement, e.target);
    });
  }
}
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
          };
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
