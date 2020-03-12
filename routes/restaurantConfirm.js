const express = require('express');
const router  = express.Router();
const { is_accepted, is_completed } = require('../db/queries');
const { timeConfirmed, orderCompleted } = require('./twilio_msgs');

router.post('/confirm_order', (req, res) => {
  // timeConfirmed(req.body.time_est);
  is_accepted(req.body.order_id, true, req.body.time_est);
  res.send(req.body.time_est)
});

router.post('/completed', (req, res) => {
  is_completed(req.body.order_id, true);
  // orderCompleted();
  res.send(req.body.order_id)
});

module.exports = router;
