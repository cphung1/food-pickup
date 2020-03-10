// const messagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ATUH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

const orderConfirmed = function (order_id) {
  twilioClient.messages
    .create({
       body: `http://localhost:8080/restaurant_confirm/${order_id}`,
       from: '+16042621059',
       to: '+17809918297'
     })
    .then(message => console.log(message.sid));
}

const timeConfirmed = function (time_est) {
  twilioClient.messages
  .create({
     body: `Your order has been confirmed. It will be ready in approximately ${time_est} minutes.`,
     from: '+16042621059',
     to: '+17809918297'
   })
  .then(message => console.log(message.sid));
}

module.exports = { orderConfirmed, timeConfirmed };
