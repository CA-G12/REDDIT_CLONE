const connection = require('../../config/connection');

const checkUserQuery = (email) => connection.query('select * from users where email =$1', [email]);

module.exports = checkUserQuery;
