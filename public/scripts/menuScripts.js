//----------------------------------------JQUERY FUNCTIONS--------------------------------//
$( document ).ready(function() {

  let is_logged_in = document.cookie;

  console.log(is_logged_in);
  if (!is_logged_in) {
  $( ".login_button" ).click(function( event ) {
    event.preventDefault();
    $("login_form").css("display", "none");
    $('top_bar').append(`<p>Logged in as Cathy</p>`);
    $('top_bar').css("font-weight", "bold");
    document.cookie = "is_logged_in=true";
  })
} else {
  $("login_form").css("display", "none");
    $('top_bar').append(`<p>Logged in as Cathy</p>`);
    $('top_bar').css("font-weight", "bold");
}
});
