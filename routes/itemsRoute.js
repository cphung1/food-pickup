const express = require('express');
const router = express.Router();
const { browse } = require('../db/queries');

router.get('/', (req, res) => {
  browse((err, items) => {
    if (err) {
      return res.render('error', { err });
    }
    console.log({ items })
    res.render('items', { items });
  });
});

module.exports = router;
