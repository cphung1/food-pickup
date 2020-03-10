// router.post('/confirmed_time_est', (req, res) => {
//   timeConfirmed(req.body.time_est);
// });


// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/a"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

const { timeConfirmed } = require('./twilio_msgs');

$(function() {
  const timeConfirmed = function() {
    event.preventDefault();
    $('#confirm_time_est_btn').click(function () {
      console.log($(this))
    });
  };

  timeConfirmed();
});
