const express = require('express');
const router = express.Router();
const { deleteItem } = require('../db/queries');

router.post('/delete', (req, res) => {
  deleteItem(req.body.order_id, req.body.item_id)
  res.redirect("/")
});

module.exports = router;
