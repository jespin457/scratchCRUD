const path = require('path')
const db = require(path.resolve(__dirname, '../../database/pool.js'));

const apiController = {
  async signupUser(req, res, next) {
    const query = `INSERT INTO users (email, username, password)
    VALUES ($1, $2, $3)
    RETURNING *`;

    const values = [req.body.email, req.body.username, req.body.password];
    
    await db.query(query, values, (err, queryResponse) => {
      if (err) {
        return next(err);
      }

      res.locals.registered = queryResponse.rows[0];
      return next();
    });
  },

  async signinUser(req, res, next) {
    const query = `SELECT _id, username FROM users
    WHERE username = $1 AND password = $2`;

    const values = [req.query.username, req.query.password];

    await db.query(query, values, (err, queryResponse) => {
      if (err) {
        return next(err);
      }
      res.cookie('user_id', queryResponse.rows[0]._id, {expires: new Date(Date.now() + 60000)});
      res.locals.signinRes = queryResponse.rows[0];
      return next();
    });
  },

  async getUserNotes(req, res, next) {
    const query = `SELECT _id, message FROM messages
    WHERE user_id = $1
    ORDER BY _id`;

    const values = [req.params.user_id];

    await db.query(query, values, (err, queryResponse) => {
      if (err) {
        return next(err);
      }

      res.locals.retrievedNotes = queryResponse.rows;
      return next();
    });
  },

  async postUserNote(req, res, next) {
    const query = `INSERT INTO messages (message, user_id)
    VALUES ($1, $2)
    RETURNING *`;

    const values = [req.body.message, req.body.user_id];

    await db.query(query, values, (err, queryResponse) => {
      if (err) {
        return next(err);
      }

      res.locals.postedNote = queryResponse.rows[0];
      return next();
    });
  },

  async deleteUserNote(req, res, next) {
    const query = `DELETE FROM messages
    WHERE _id = $1
    RETURNING *`

    const values = [req.params.note_id];

    await db.query(query, values, (err, queryResponse) => {
      if (err) {
        return next(err);
      }

      res.locals.deletedNote = queryResponse.rows[0];
      return next();
    });
  },
}

module.exports = apiController;
