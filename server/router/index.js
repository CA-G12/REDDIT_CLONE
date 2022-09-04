const { join } = require('path');

// const createError = require('http-errors');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).sendFile(join('..', '..', 'public', 'index.html'));
});

module.exports = router;
