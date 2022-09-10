const createError = require('http-errors');

const { getPostsPublicQuery } = require('../../database/queries');

const getPostsPublic = (req, res, next) => {
    getPostsPublicQuery()
    .then((rows) => {
      if (rows.length) {
        res.json({ posts: rows });
      } else {
        res.status(300).json({ msg: 'There is no posts' });
      }
    })
    .catch((err) => { next(createError(500, `server error in getting user ${err}`)); });
};

module.exports = getPostsPublic;
