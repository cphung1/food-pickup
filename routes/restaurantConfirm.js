const express = require('express');
const router  = express.Router();

router.get('/restaurant_confirm', (req, res) => {
  res.render('restaurant');
});

module.exports = router;
