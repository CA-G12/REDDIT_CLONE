const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (obj) => new Promise((resolve, reject) => {
  jwt.sign(obj, process.env.SECRET_KEY, { algorithm: 'HS256' }, (err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

module.exports = createToken;
