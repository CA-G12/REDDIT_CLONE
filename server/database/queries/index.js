const {
  addUserQuery, checkUserQuery, getUserQuery, getUserPublicQuery,
} = require('./usersQueries');
const { addPostQuery, getPostsQuery } = require('./postsQueries');
const { addVoteQuery, getVotesQuery } = require('./votesQueries');

module.exports = {
  addUserQuery,
  checkUserQuery,
  getUserQuery,
  addPostQuery,
  getUserPublicQuery,
  getPostsQuery,
  addVoteQuery,
  getVotesQuery,
};
