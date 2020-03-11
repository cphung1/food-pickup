const express = require('express');
const router  = express.Router();
const { checkoutItems, is_accepted, is_completed } = require('../db/queries');
const { timeConfirmed } = require('./twilio_msgs');

router.get('/restaurant_confirm/:id', (req, res) => {
  let order_id = req.params.id
  checkoutItems(order_id, (err, checkoutStuff) => {
    if (err) {
      return res.render('error', { err });
    }
    res.render('restaurant', { checkoutStuff, order_id});
  });
});

router.post('/restaurant_confirm/:id', (req, res) => {
  timeConfirmed(req.body.time_est);
  is_accepted(req.params.id, true, req.body.time_est);

});

router.post('/completed', (req, res) => {
  console.log(req.body.order_id)
  is_completed(req.body.order_id, true);
  console.log(req.body.order_id)
  res.redirect(`/restaurant_confirm/${req.body.order_id}`)
});

module.exports = router;
