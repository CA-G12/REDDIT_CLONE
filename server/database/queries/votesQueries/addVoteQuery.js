const connection = require('../../config/connection');

const addVoteQuery = ({ postId, userId, vote }) => {
  const sql = {
    text: 'INSERT INTO votes (post_id , user_id , vote) values ($1 ,$2, $3) ON CONFLICT (post_id,user_id) DO UPDATE SET vote = $3 RETURNING * ;',
    values: [postId, userId, vote],
  };

  return connection.query(sql).then((res) => res.rows[0]);
};

module.exports = addVoteQuery;
