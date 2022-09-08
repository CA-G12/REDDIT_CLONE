const { join } = require('path');
const privateRouter = require('express').Router();
const { addPost } = require('../controllers');

privateRouter.get('/', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'private', 'index.html'));
});

privateRouter.post('/posts', addPost);

module.exports = privateRouter;
