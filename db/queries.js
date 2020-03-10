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

const checkoutItems = (orderId, cb) => {

  client.query(`SELECT * from order_items
  JOIN orders ON order_id = orders.id
  JOIN items on items.id = item_id
  WHERE orders.id = ${orderId};`)
    .then(data => {
      cb(null, data.rows);
    })
    .catch(err => cb(err));
}


const newOrder = (is_empty, cb) => {

  if (is_empty) {
    client.query(`INSERT INTO orders (user_id, is_accepted, is_done, time_est)
    VALUES (1, false, false, 0);`)
    .then(() => {
    client.query(`SELECT id from orders
    ORDER BY id DESC
    LIMIT 1;`)
    .then(data => {
      cb(null,data.rows);
    })
    })
    .catch(err => cb(err));
  }

  if (!is_empty) {
    client.query(`SELECT id from orders
    ORDER BY id DESC
    LIMIT 1;`)
    .then(data => {
      cb(null,data.rows);
    })
  }

}

const addItem = (order_id, item_id, quantity, spec_req) => {

  console.log("stuff", order_id);
  console.log("item", item_id);
  console.log("quantity", quantity);
  console.log("specrec", spec_req);

  client.query(`INSERT INTO order_items (order_id, item_id, quantity, special_requests)
  VALUES ($1, $2, $3, $4);`, [order_id, item_id, quantity, spec_req]);
}

module.exports = { browse, checkoutItems, newOrder, addItem };
