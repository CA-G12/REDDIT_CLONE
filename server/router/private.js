const { join } = require('path');
const express = require('express');
const privateRouter = express.Router();
const { addPost, getUserInfo } = require('../controllers');

privateRouter.use(express.static('private'));
privateRouter.get('/', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'private', 'index.html'));
});

privateRouter.post('/posts', addPost);
privateRouter.get('/getUser', getUserInfo);

module.exports = privateRouter;
