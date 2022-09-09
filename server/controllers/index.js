const { addUser, loginUser, getUserInfo } = require('./users');
const { addPost, getPosts } = require('./posts');

module.exports = {
  addUser, loginUser, addPost, getUserInfo, getPosts
};
