// auto refreshes page for customer
$(function() {
  // setTimeout(function() {location.reload();}, 5000);


  // const url = window.location.href
  // const arr = url.split('/')
  // console.log(arr[arr.length - 1])

  console.log($('#is_accepted').text())
  if ($('#is_accepted').text() === 'true') {
    $('#is_accepted').append(`
    <p><i class="fas fa-check"></i> Order is confirmed.</p>
    `)
    $('#time_est').append(`
    <p>${$('#time_est').text()} minutes.</p>
    `)
  }

  if ($('#is_done').text() === 'true') {
    $('#is_done').append(`
    <p><i class="fas fa-check"></i> Order is completed.</p>
    `)
  }

});
