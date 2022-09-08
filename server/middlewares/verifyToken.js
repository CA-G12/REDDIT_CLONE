const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) { res.status(300).redirect('/login'); } else {
      req.token = decoded;
      next();
    }
  });
};
module.exports = verifyToken;
