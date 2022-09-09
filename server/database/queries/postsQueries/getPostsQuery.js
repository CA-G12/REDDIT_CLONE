const connection = require('../../config/connection');

const getPostsQuery = (userId) => {
  const sql = {
    text:
        'SELECT posts.id,  posts.content, posts.image  AS post_img , posts.time, users.username, users.image AS user_img , votes.vote FROM users JOIN posts ON posts.user_id =users.id LEFT JOIN votes ON votes.user_id = $1 AND votes.post_id=posts.id',
    values: [userId],
  };
  return connection
    .query(sql)
    .then((res) => res.rows);
};

module.exports = getPostsQuery;
