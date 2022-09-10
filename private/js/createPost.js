const createPost = (postObj) => {
  const post = document.createElement('article');
  post.className = 'post';
  post.dataset.id = postObj.id;

  const voteBtns = document.createElement('div');
  voteBtns.className = 'vote-btns';


  const upBtn = document.createElement('i');
  if (postObj.vote === true) {
    upBtn.classList.add('vote-btn', 'fa-solid', 'fa-up');
  } else {
    upBtn.classList.add('vote-btn', 'fa-light', 'fa-up');
  }
  voteBtns.appendChild(upBtn);

  const votesCount = document.createElement('span');
  votesCount.className = 'votes-count';
  // temp
  if(postObj.votes_count){
    votesCount.textContent = postObj.votes_count;
  }else{
    votesCount.textContent ='vote';
  }
  voteBtns.appendChild(votesCount);

  const downBtn = document.createElement('i');
  if (postObj.vote === false) {
    downBtn.classList.add('vote-btn', 'fa-solid', 'fa-down');
  } else {
    downBtn.classList.add('vote-btn', 'fa-light', 'fa-down');
  }
  voteBtns.appendChild(downBtn);


  post.appendChild(voteBtns);

  const postInfo = document.createElement('div');
  postInfo.className = 'post-info';

  const userInfo = document.createElement('div');
  userInfo.className = 'user-info';

  const userImg = document.createElement('div');
  userImg.className = 'user-img';
  userImg.style.backgroundImage = `url(${postObj.user_img})`
  userInfo.appendChild(userImg);

  const userName = document.createElement('a');
  userName.className = 'user-name';

  userName.href = `/user/${postObj.username}`;
  userName.textContent = postObj.username;
  userInfo.appendChild(userName);

  postInfo.appendChild(userInfo);

  const postContent = document.createElement('div');
  postContent.className = 'post-content';

  const postTxt = document.createElement('div');
  postTxt.className = 'post-text';
  postTxt.textContent = postObj.content;
  postContent.appendChild(postTxt);

  if (postObj.post_img) {
    const postImg = document.createElement('img');
    postImg.className = 'post-img';
    postImg.src = postObj.post_img;
    postContent.appendChild(postImg);
  }

  postInfo.appendChild(postContent);

  const postRelevant = document.createElement('div');
  postRelevant.className = 'post-relevant';

  const save = document.createElement('div');
  save.className = 'save';
  save.title = 'save post';

  const saveIcon = document.createElement('i');
  saveIcon.classList.add('fa-light', 'fa-bookmark');
  save.appendChild(saveIcon);

  postRelevant.appendChild(save);

  const comments = document.createElement('div');
  comments.className = 'comments';
  comments.title = 'comments';

  const commentsIcon = document.createElement('i');
  commentsIcon.classList.add('fa-light', 'fa-message-captions');
  comments.appendChild(commentsIcon);

  const commentsCount = document.createElement('span');
  commentsCount.textContent = 'static';
  comments.appendChild(commentsCount);

  postRelevant.appendChild(comments);

  postInfo.appendChild(postRelevant);

  post.appendChild(postInfo);

  return post;
};
