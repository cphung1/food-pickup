$(function() {
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

  $('#order_done_btn').click(function () {
    let $orderId = $(this).parent().serialize();
    console.log($orderId);
    $.ajax( {
      type: "POST",
      url:"/restaurant/completed",
      data: ($orderId),
      success: function(data) {
        $('#order_done_btn').toggleClass("disable_complete")
        $('#completed').append(`
          <p>Order is completed.</p>
        `);
      }
    })
  });
});


