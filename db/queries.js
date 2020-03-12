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

//This generates a list of all menu items
const browse = (cb) => {
  client.query('SELECT * FROM items;')
    .then(data => {
      cb(null, data.rows);
    })
    .catch(err => cb(err));
};

// This lists all the items that you have ready for checkout
const checkoutItems = (orderId, cb) => {

  client.query(`SELECT * from order_items
  JOIN orders ON order_id = orders.id
  JOIN items on items.id = item_id
  WHERE orders.id = ${orderId};`)
    .then(data => {

      cb(null, data.rows);
    })
    .catch(err => cb(err));
};

// This creates a new order when you add 1 or more items into the cart
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

//this adds each individual items to an order. Updates everytime you add an item to the cart
const addItem = (order_id, item_id, quantity, spec_req) => {
  client.query(`INSERT INTO order_items (order_id, item_id, quantity, special_requests)
  VALUES ($1, $2, $3, $4);`, [order_id, item_id, quantity, spec_req]);
}

//this deletes an individual item from the cart
const deleteItem = (order_id, item_id) => {
  client.query(`DELETE FROM order_items
  WHERE order_id = $1 AND item_id = $2;`, [order_id, item_id])
};

const is_accepted = (id, bool, time) => {
  const sql = 'UPDATE orders SET is_accepted = $2, time_est = $3 WHERE id = $1;';
  const args = [id, bool, time];
  client.query(sql, args);
};

const is_completed = (id, bool) => {
  const sql = 'UPDATE orders SET is_done = $2 WHERE id = $1;';
  const args = [id, bool];
  client.query(sql, args);
};

module.exports = { browse, checkoutItems, newOrder, addItem, deleteItem, is_accepted, is_completed };
