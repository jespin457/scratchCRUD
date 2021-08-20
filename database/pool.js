const { Pool } = require('pg');

const PG_URI = 'postgres://tvqxgjrc:F6ih3LA-h8XNqEElPyDTSkAj4kLlXJXN@chunee.db.elephantsql.com/tvqxgjrc';

const pool = new Pool({ connectionString: PG_URI });

module.exports = {
  query: (text, params, callback) => {
    console.log('db pool executed query ->', text);
    return pool.query(text, params, callback);
  }
};