const express = require('express');
const router  = express.Router();
const { browse, checkoutItems, newOrder, addItem, deleteItem } = require('../db/queries');
// const { checkoutUpdater } = require('../public/scripts/helperFunctions');
let order_id = 55;
let is_empty = true;
let totals = { subtotal: 0, tax: 0, total: 0 };

//Adds items to cart//
router.post('/checkoutItems', (req, res) => {
  //addItemData has the data from the submitted add item form
  const addItemData = {
    item_id: req.body.item_id,
    quantity: req.body.quant,
    special_req: req.body.specialRequests,
  };
  //Creates a new order if this is the first item in the cart. If you're in an existing order, then it just adds items to the order
  newOrder(is_empty, (err, order) => {
    is_empty = false;
    if (err) {
      return res.render('error', { err });
    }
    order_id = order[0].id;
    addItem(order_id, addItemData.item_id, addItemData.quantity, addItemData.special_req);
    checkoutUpdater((obj) => {
      res.send(obj);
    });
  });

});
//Deletes items from cart//
router.post('/deleteItems', (req, res) => {
  newOrder(is_empty, (err, order) => {
    is_empty = false;
    if (err) {
      return res.render('error', { err });
    }
    order_id = order[0].id;
    deleteItem(order_id, req.body.item_id);
  checkoutUpdater((obj) => {
    res.send(obj);
  });
  });
});

//------------------------------------------------Helper Functions-------------------------------------------
let checkoutUpdater = function(cb) {

  browse((err, items) => {
    // if (err) {
    //   return res.render('error', { err });
    // }

    checkoutItems(order_id, (err, itemsInCheckout) => {
      // if (err) {
      //   return res.render('error', { err });
      // }
      let subtotal = 0; let tax = 0;
      for (let i = 0; i < itemsInCheckout.length; i++) {
        subtotal += (itemsInCheckout[i].price * itemsInCheckout[i].quantity);
      }
      totals.subtotal = Math.round(subtotal * 100) / 100;
      totals.tax = Math.round(subtotal * 0.12 * 100) / 100;
      totals.total = Math.round((subtotal + subtotal * 0.12) * 100) / 100;

      cb({ itemsCheckInCheckout: itemsInCheckout, totals: totals });
    });
  });
};

module.exports = router;
