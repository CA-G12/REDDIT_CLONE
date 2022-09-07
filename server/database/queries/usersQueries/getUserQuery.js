const connection = require('../../config/connection');

const getUserQuery = (email) => {
  const sql = {
    text: 'SELECT id, email, password FROM users WHERE email=$1 ',
    values: [email],
  };
  return connection.query(sql)
    .then((res) => res.rows);
};

module.exports = getUserQuery;
