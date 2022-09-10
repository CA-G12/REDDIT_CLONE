const { addUser, loginUser, getUserInfo } = require('./users');
const { addPost, getPosts, getPostsPublic } = require('./posts');
const { addVote } = require('./votes');

module.exports = {
  addUser, loginUser, addPost, getUserInfo, getPosts, addVote, getPostsPublic
};
