const connection = require('../../config/connection');

const getPostsPublicQuery = () => {
  const sql = {
    text:
      'SELECT posts.id,  posts.content, posts.image  AS post_img , posts.time, users.username, users.image AS user_img , votes_count_table.votes_count FROM users JOIN posts ON posts.user_id =users.id LEFT JOIN(select t1.post_id , t2.votes_count FROM votes AS t1 JOIN (select post_id , count(*) AS votes_count FROM votes where vote = true GROUP BY post_id ) AS t2 On (t1.post_id = t2.post_id ) GROUP BY (t1.post_id , t2.votes_count)) votes_count_table ON(posts.id = votes_count_table.post_id) ORDER BY posts.id',
    values: [],
  };
  return connection
    .query(sql)
    .then((res) => res.rows);
};

module.exports = getPostsPublicQuery;
