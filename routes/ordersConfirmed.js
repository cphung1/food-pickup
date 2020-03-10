const express = require('express');
const router  = express.Router();
const { checkoutItems } = require('../db/queries');

router.get('/confirmed', (req, res) => {
  checkoutItems((err, checkoutStuff) => {
    if (err) {
      return res.render('error', { err });
    }
    res.render('confirmed', { checkoutStuff });
  });
});

module.exports = router;
