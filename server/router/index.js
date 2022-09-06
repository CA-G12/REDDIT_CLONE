const { join } = require('path');
const router = require('express').Router();

const { addUser } = require('../controllers');
// const createError = require('http-errors');

router.get('/', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
});

router.post('/signup', addUser);

router.get('/signup', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
});

router.get('/login', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
});

module.exports = router;
