const { join } = require('path');
const router = require('express').Router();

const { addUser, loginUser } = require('../controllers');
const { serverError } = require('../errors');
const privateRouter = require('./private');
// const createError = require('http-errors');

router.use('/private', privateRouter );
router.get('/', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
});

router.post('/signup', addUser);

router.get('/signup', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
});


router.post('/login', loginUser);

router.get('/login', (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
});

router.use(serverError);

module.exports = router;
