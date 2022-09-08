const connection = require('../../config/connection');

const addPostQuery = ({user_id, content, image}) => {
  const sql = {
    text: image
      ? 'INSERT INTO posts(user_id , content, image) VALUES($1, $2 , $3) RETURNING *'
      : 'INSERT INTO posts(user_id , content) VALUES($1, $2) RETURNING * ',
    values: image ? [user_id, content, image]
      : [user_id , content],
  };

  return connection
    .query(sql)
    .then((res) => res.rows[0]);
};

module.exports = addPostQuery;
