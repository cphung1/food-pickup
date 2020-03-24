// auto refreshes page for customer
$(function() {
  setTimeout(function() {location.reload();}, 5000);

  if ($('#is_accepted').attr("value") === 'true') {
    $('#is_accepted').addClass("complete")
    $('#time_est').addClass("complete")
    $('#is_accepted').empty();
    $('#is_accepted').append(`
    <p><i class="fas fa-check"></i> Order is confirmed.</p>
    `)
    $('#time_est').empty();
    $('#time_est').append(`
    <p><i class="fas fa-hourglass-half"></i> Order will be ready ${$('#time_est').attr("value")} minutes.</p>
    `)
  }

  if ($('#is_done').attr("value") === 'true') {
    $('#is_done').addClass("complete")
    $('#is_done').empty();
    $('#is_done').append(`
    <p><i class="fas fa-check"></i> Order is completed.</p>
    `)
  }

});
