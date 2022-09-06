const { join } = require('path');

const serverError = (err, req, res, next) => {
  if (err.status >= 500) {
    console.log(err.message);
    res.status(500).sendFile(join(__dirname, '..', '..', 'public', 'serverError.html'));
  } else {
    console.log(err);
  }
};

module.exports = serverError;
