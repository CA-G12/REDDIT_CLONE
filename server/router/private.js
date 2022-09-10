const { join } = require('path');
const express = require('express');
const privateRouter = express.Router();
const { addPost, getUserInfo, getPosts, addVote } = require('../controllers');

privateRouter.use(express.static('private'));
privateRouter.get('/', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'private', 'index.html'));
});

privateRouter.post('/posts', addPost);
privateRouter.get('/posts', getPosts);
privateRouter.get('/getUser', getUserInfo);
privateRouter.post('/votes', addVote);

module.exports = privateRouter;
