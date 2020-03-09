const pg = require('pg');
const Client = pg.Client;

const options = {
  host: 'drona.db.elephantsql.com',
  database: 'wquprnon',
  user: 'wquprnon',
  password: 'TyvAJ-61ldtnZ9YZetkO2SC5T-jBtXny',
};

const client = new Client(options);
client.connect();

const browse = (cb) => {
  client.query('SELECT * FROM items;')
    .then(data => {
      cb(null, data.rows);
    })
    .catch(err => cb(err));
};

const checkoutItems = (cb) => {
  client.query(`SELECT * from order_items
  JOIN orders ON order_items.order_id = orders.id
  JOIN items on items.id = order_items.id
  WHERE orders.id = 4;`)
    .then(data => {
      cb(null, data.rows);
    })
    .catch(err => cb(err));
}

module.exports = { browse, checkoutItems };
