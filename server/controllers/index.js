const { addUser, loginUser, getUserInfo } = require('./users');
const { addPost } = require('./posts');

module.exports = {
  addUser, loginUser, addPost, getUserInfo,
};
