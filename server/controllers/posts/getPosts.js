const createError = require('http-errors');

const { getPostsQuery } = require('../../database/queries');

const getPosts = (req, res, next) => {
  getPostsQuery(req.token.id)
    .then((rows) => {
      if (rows.length) {
        res.json({ posts: rows });
      } else {
        res.status(300).json({ msg: 'There is no posts' });
      }
    })
    .catch((err) => { next(createError(500, `server error in getting user ${err}`)); });
};

module.exports = getPosts;
