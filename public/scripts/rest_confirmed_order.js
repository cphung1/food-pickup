$(function() {
  $('#confirm_time_est_btn').click(function () {
      let $time = $(this).parent().serialize();
      $.ajax( {
        type: "POST",
        url:"/restaurant/confirm_order",
        data: ($time),
        success: function(data) {
          $('#time').addClass("disable")
          $('#time').append(`
            <p>Time has been submitted. (${data} minutes)</p>
          `);
        }
      })
    });
});


