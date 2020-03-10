//----------------------------------------JQUERY FUNCTIONS--------------------------------//
$( document ).ready(function() {

  $( ".login_button" ).click(function( event ) {
    event.preventDefault();
    $("login_form").css("display", "none");
    $('top_bar').append(`<p>Logged in as Cathy</p>`);
    $('top_bar').css("font-weight", "bold");
  });

});
