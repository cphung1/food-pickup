const express = require('express');
const router  = express.Router();
const { checkoutItems } = require('../db/queries');

router.get('/confirmed/:id', (req, res) => {
  let order_id = req.params.id
  checkoutItems(order_id, (err, checkoutStuff) => {
    if (err) {
      return res.render('error', { err });
    }
    res.render('confirmed', { checkoutStuff, order_id });
  });
});

module.exports = router;
