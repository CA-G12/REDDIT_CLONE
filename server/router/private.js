const { join } = require('path');
const express = require('express');
const privateRouter = express.Router();
const { addPost } = require('../controllers');

privateRouter.use(express.static('private'));
privateRouter.get('/', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'private', 'index.html'));
});

privateRouter.post('/posts', addPost);

module.exports = privateRouter;
