const createError = require('http-errors');
const { getUserPublicQuery } = require('../../database/queries');

const getUserInfo = (req, res, next) => {
  getUserPublicQuery(req.token.id)
    .then((row) => {
      if (row) {
        res.json({ user: row });
      } else {
        res.status(300).json({ path: '/login' });
      }
    })
    .catch((err) => { next(createError(500, `server error in getting user ${err}`)); });
};

module.exports = getUserInfo;
