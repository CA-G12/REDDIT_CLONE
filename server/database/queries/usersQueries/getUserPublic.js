const connection = require('../../config/connection');

const getUserPublicQuery = (id) => {
  const sql = {
    text: 'SELECT id, username, image FROM users WHERE id=$1 ',
    values: [id],
  };
  return connection.query(sql)
    .then((res) => res.rows[0]);
};

module.exports = getUserPublicQuery;
