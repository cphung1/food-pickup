// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const { browse, checkoutItems, newOrder, addItem, deleteItem } = require('./db/queries');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const login = require("./routes/login")
const apiData = require("./routes/apis")
const ordersConfirmedRender = require("./routes/ordersConfirmedRender");
const restaurantConfirm = require("./routes/restaurantConfirm")
const restaurantRender = require("./routes/restConfirmRender")
// const deleteItems = require("./routes/deleteRoute")


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use(login);
app.use("/apis", apiData);
// setInterval(function(){ app.use(ordersConfirmedRender); }, 5000);
app.use(ordersConfirmedRender);
app.use("/restaurant", restaurantConfirm);
app.use(restaurantRender)
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
let order_id = 0;
let is_empty = true;
let totals = {
  subtotal: 0,
  tax: 0,
  total: 0
};


app.get("/", (req, res) => {

  browse((err, items) => {
    if (err) {
      return res.render('error', { err });
    }
    //Gets the cart items on page reload
    checkoutItems(order_id, (err, itemsInCheckout) => {
      if (err) {
        return res.render('error', { err });
      }
      res.render('index', { items, itemsInCheckout, totals });
    });
  });
});

app.post('/delete', (req, res) => {
  deleteItem(req.body.order_id, req.body.item_id);
  browse((err, items) => {
    if (err) {
      return res.render('error', { err });
    }

    checkoutItems(order_id, (err, itemsInCheckout) => {
      if (err) {
        return res.render('error', { err });
      }
      if (itemsInCheckout.length === 0 ){
        totals.subtotal = 0;
        totals.tax = 0;
        totals.total = 0;
        res.render('index', { items, itemsInCheckout, totals });
      }else {
        let subtotal = 0;
        for (let i = 0; i < itemsInCheckout.length; i++) {
          subtotal+= (itemsInCheckout[i].price * itemsInCheckout[i].quantity);
        }
        totals.subtotal = Math.round(subtotal*100) / 100;
        totals.tax = Math.round(subtotal*0.12*100) / 100;
        totals.total = Math.round((subtotal + subtotal*0.12)*100) / 100;
        res.render('index', { items, itemsInCheckout, totals });
      }
    });
  });
  res.redirect("/")
});

// const { orderConfirmed } = require('./routes/twilio_msgs')


app.post('/order_placed', (req, res) => {
  orderConfirmed(order_id);
  res.redirect(`/confirmed/${order_id}`)
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

