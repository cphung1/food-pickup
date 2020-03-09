const db = require('./db');

const browse = (cb) => {
  db.query('SELECT * FROM items;')
    .then(data => {
      cb(null, data.rows);
    })
    .catch(err => cb(err));
};

module.exports = { browse };
