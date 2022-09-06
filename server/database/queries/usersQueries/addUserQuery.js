const bcrypt = require('bcryptjs');
const connection = require('../../config/connection');

// const createError = require('http-errors');
const addUserQuery = ({
  email, username, password, country,
}) => {
  const sql = {
    text: country
      ? 'INSERT INTO users(email , username ,password , country) VALUES($1, $2 , $3 ,$4) RETURNING * '
      : 'INSERT INTO users(email , username ,password) VALUES($1, $2 , $3)  RETURNING *',
    values: country ? [email, username, bcrypt.hashSync(password, 10), country]
      : [email, username, bcrypt.hashSync(password, 10)],
  };

  return connection
    .query(sql)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack));
  //   console.log(res.rows[0]);
  // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
};

module.exports = addUserQuery;
