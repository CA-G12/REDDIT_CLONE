const { join } = require('path');
const router = require('express').Router();

const { addUser } = require('../controllers');
// const createError = require('http-errors');

router.get('/', (req, res) => {
  res.status(200).sendFile(join('..', '..', 'public', 'index.html'));
});

router.post('/signup', addUser);

module.exports = router;
