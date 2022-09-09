const connection = require('../../config/connection');

const getPostsQuery = (userId) => {
  const sql = {
    text:
        'SELECT posts.id,  posts.content, posts.content , posts.time, users.username, users.image , votes.vote FROM users JOIN posts ON posts.user_id =users.id LEFT JOIN votes ON votes.user_id = $1 AND votes.post_id=posts.id',
    values: [userId],
  };
  return connection
    .query(sql)
    .then((res) => res.rows);
};

module.exports = getPostsQuery;
