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

const { browse, checkoutItems, newOrder, addItem } = require('./db/queries');

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
const ordersConfirmed = require("./routes/ordersConfirmed");
const restaurantConfirm = require("./routes/restaurantConfirm")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use(ordersConfirmed);
app.use(restaurantConfirm);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
let order_id = 55;
let is_empty = true;
let totalStuff = {
  subtotal: 0,
  tax: 0,
  total: 0
};

app.get("/", (req, res) => {


    browse((err, items) => {
      if (err) {
        return res.render('error', { err });
      }

      checkoutItems(order_id, (err, checkoutStuff) => {
        if (err) {
          return res.render('error', { err });
        }
        res.render('index', { items, checkoutStuff, totalStuff });
      });
    });
});



app.post('/', (req, res) => {

  console.log(req.body);

  const templateVars = {
    item_id: req.body.item_id,
    special_req: req.body.specialRequests,
    quantity: req.body.quant
  }

  newOrder( is_empty, (err, order) => {
    is_empty = false;
    if (err) {
      return res.render('error', { err });
    }
    order_id = order[0].id;

    addItem(order_id, templateVars.item_id, templateVars.quantity, templateVars.special_req);


    browse((err, items) => {
      if (err) {
        return res.render('error', { err });
      }

      checkoutItems(order_id, (err, checkoutStuff) => {

        if (err) {
          return res.render('error', { err });
        }
        let subtotal = 0; let tax = 0; let grandTotal = 0;
        for (let i = 0; i < checkoutStuff.length; i++) {
          subtotal+= (checkoutStuff[i].price * checkoutStuff[i].quantity);
        }
        totalStuff.subtotal = Math.round(subtotal*100) / 100;
        totalStuff.tax = Math.round(subtotal*0.12*100) / 100;
        totalStuff.total = Math.round((subtotal + subtotal*0.12)*100) / 100;
        res.render('index', { items, checkoutStuff, totalStuff });
      });
    });

  });

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
