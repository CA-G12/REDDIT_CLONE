const createError = require('http-errors');

const { addPostQuery } = require('../../database/queries');
const { postSchema } = require('../../helpers/schemaValidation');
const schemaValidator = require('../../helpers/schemaValidator');

const addPost = (req, res, next) => {
  req.body.image = req.body.image === '' ? null : req.body.image;
  req.body.user_id = req.token.id;
  schemaValidator(req.body, postSchema)
    .then(() => {
      addPostQuery(req.body)
        .then((post) => { res.json({ post }); })
        .catch((err) => { next(createError(500, `server error in adding post ${err}`)); });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.json({ err });
      } else {
        next(createError(500, `server error ${err}`));
      }
    });
};

module.exports = addPost;
