const { addUser, loginUser, getUserInfo } = require('./users');
const { addPost, getPosts } = require('./posts');
const { addVote } = require('./votes');

module.exports = {
  addUser, loginUser, addPost, getUserInfo, getPosts, addVote,
};
