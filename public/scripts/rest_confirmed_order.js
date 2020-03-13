$(function() {
  // restaurant clicked confirm time estimate button
  // displays confirmed messaged
  // sends text to notify customer of order status
  $('#confirm_time_est_btn').click(function () {
    let $time = $(this).parent().serialize();
    $.ajax( {
      type: "POST",
      url:"/restaurant/confirm_order",
      data: ($time),
      success: function(data) {
        $('#time').addClass("disable_confirm")
        $('#completed').removeClass("hide_completed")
        $('#time').append(`
          <p>Time has been submitted. (${data} minutes)</p>
        `);
      }
    })
  });

  // restaurant has clicked order done button
  // displays order complete message
  // sends text message to notify customer of order status
  $('#order_done_btn').click(function () {
    let $orderId = $(this).parent().find("div").find("input").serialize();
    $.ajax( {
      type: "POST",
      url:"/restaurant/completed",
      data: ($orderId),
      success: function() {
        $('#order_done_btn').toggleClass("disable_complete")
        $('#completed').append(`
          <p id="order_is_completed">Order is completed.</p>
        `);
      }
    })
  });
});


