const createPost = (info) => {
  const post = document.createElement('article');
  post.className = 'post';

  const voteBtns = document.createElement('div');
  voteBtns.className = 'vote-btns';

  const upBtn = document.createElement('i');
  upBtn.classList.add('fa-light', 'fa-up', 'vote-btn');
  voteBtns.appendChild(upBtn);

  const votesCount = document.createElement('span');
  votesCount.className = 'votes-count';
  // temp
  votesCount.textContent = 'vote';
  voteBtns.appendChild(votesCount);

  const downBtn = document.createElement('i');
  downBtn.classList.add('fa-light', 'fa-down', 'vote-btn');
  voteBtns.appendChild(downBtn);

  post.appendChild(voteBtns);

  const postInfo = document.createElement('div');
  postInfo.className = 'post-info';

  const userInfo = document.createElement('div');
  userInfo.className = 'user-info';

  const userImg = document.createElement('div');
  userImg.className = 'user-img';
  userInfo.appendChild(userImg);

  const userName = document.createElement('a');
  userName.className = 'user-name';
  // temp
  userName.href = '#';
  userName.textContent = 'Temp_Name';
  userInfo.appendChild(userName);

  postInfo.appendChild(userInfo);

  const postContent = document.createElement('div');
  postContent.className = 'post-content';

  const postTxt = document.createElement('div');
  postTxt.className = 'post-text';
  postTxt.textContent = info.content;
  postContent.appendChild(postTxt);

  if (info.image) {
    const postImg = document.createElement('img');
    postImg.className = 'post-img';
    postImg.src = info.image;
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
