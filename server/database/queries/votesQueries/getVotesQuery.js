const connection = require('../../config/connection');

const getVotesQuery = (postId) => {
  const sql = {
    text: 'SELECT COUNT(*) AS post_votes FROM votes WHERE vote = true AND post_id = $1',
    values: [postId],
  };

  return connection.query(sql).then((res) => res.rows[0]);
};

module.exports = getVotesQuery;
