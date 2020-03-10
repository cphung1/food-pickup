const express = require('express');
const router  = express.Router();
const { checkoutItems } = require('../db/queries');

router.get('/restaurant_confirm', (req, res) => {
  checkoutItems((err, checkoutStuff) => {
    if (err) {
      return res.render('error', { err });
    }
    res.render('restaurant', { checkoutStuff });
  });
});

module.exports = router;
