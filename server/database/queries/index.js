const {
  addUserQuery, checkUserQuery, getUserQuery, getUserPublicQuery,
} = require('./usersQueries');
const { addPostQuery, getPostsQuery } = require('./postsQueries');

module.exports = {
  addUserQuery, checkUserQuery, getUserQuery, addPostQuery, getUserPublicQuery, getPostsQuery,
};
