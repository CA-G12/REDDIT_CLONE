const Pool = require('pg');

require('dotenv').config();

let DB_URL;
let ssl = false;

switch (process.env.NODE_ENV) {
  case 'production':
    DB_URL = process.env.DATABASE_URL;
    ssl = {
      rejectUnauthorized: false,
    };
    break;
  case 'development':
    DB_URL = process.env.DEV_DB_URL;
    break;
  case 'testing':
    DB_URL = process.env.TEST_DB_URL;
    break;

  default:
    throw new Error('Invalid database URL');
}

const connection = new Pool({
  connectionString: DB_URL,
  ssl,
});

module.exports = connection;
