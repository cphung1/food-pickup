const express = require('express');
const router  = express.Router();
const { checkoutItems } = require('../db/queries');

router.get('/confirmed/:id', (req, res) => {
  let order_id = req.params.id;
  let totals = { subtotal: 0, tax: 0, total: 0 };
  checkoutItems(order_id, (err, checkoutStuff) => {
    if (err) {
      return res.render('error', { err });
    }
    let subtotal = 0;
    for (let i = 0; i < checkoutStuff.length; i++) {
      subtotal += (checkoutStuff[i].price * checkoutStuff[i].quantity);
    }
    totals.subtotal = Math.round(subtotal * 100) / 100;
    totals.tax = Math.round(subtotal * 0.12 * 100) / 100;
    totals.total = Math.round((subtotal + subtotal * 0.12) * 100) / 100;

    res.render('confirmed', { checkoutStuff, order_id, totals });
  });
});



module.exports = router;
