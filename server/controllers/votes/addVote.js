const createError = require('http-errors');

const { addVoteQuery, getVotesQuery } = require('../../database/queries');
const { voteSchema } = require('../../helpers/schemaValidation');
const schemaValidator = require('../../helpers/schemaValidator');

const addVote = (req, res, next) => {
  req.body.userId = req.token.id;
  const { vote } = req.body;
  schemaValidator({ vote }, voteSchema)
    .then(() => {
      addVoteQuery(req.body)
        .then((post) => {
          getVotesQuery(post.post_id)
            .then((votes) => { res.json({ votes }); })
            .catch((err) => { next(createError(500, `server error in getting post's votes ${err}`)); });
        })
        .catch((err) => { next(createError(500, `server error in adding vote ${err}`)); });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.json({ err });
      } else {
        next(createError(500, `server error ${err}`));
      }
    });
};

module.exports = addVote;
