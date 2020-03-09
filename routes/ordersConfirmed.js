const express = require('express');
const router  = express.Router();

router.get('/confirmed', (req, res) => {
  res.render('confirmed');
});

module.exports = router;
