//----------------------------------------JQUERY FUNCTIONS--------------------------------//
$( document ).ready(function() {
//-----------------------------------------------Login Features------------------------
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

//------------------------------------------Checkout Functions-------------------------------
$('.addItemButton').click(function() {

  const $inputData = $(this).parent().serialize();
  $.ajax({
    type: 'POST',
    url: '/apis/checkoutItems',
    data: ($inputData),
    success: function(data) {

      let item = data['itemsCheckInCheckout'];
      let totals = data['totals'];
      console.log("data4", totals);
      $('cart').empty();

      for (let i = 0; i < item.length; i++) {
        $('cart').prepend (`
                  <article>
                  <form action="/delete" method="POST">
                  <item>
                    <number>${item[i].quantity}</number>
                    <itemName>${item[i].name}</itemName>
                  </item>
                  <price>
                    <p>${item[i].price}</p>
                    <button id="delete_item">
                      <i class="fas fa-times fa-xs"></i>
                    </button>
                  </price>
                  <input name="order_id" type="number" value='<%= item.order_id %>'>
                  <input name="item_id" type="number" value='<%= item.item_id %>'>
                </form action="/delete" method="POST">
                </article>
        `)
      }
      $('totals').empty();

      $('totals').append (`
      <table style="width:100%">
      <tr>
        <th>Subtotal</th>
        <td id="subtotal">${totals.subtotal}</td>
      </tr>
      <tr>
        <th>Tax</th>
        <td id="tax">${totals.tax}</td>
      </tr>
      <tr>
        <th>Total</th>
        <td id="total">${totals.total}</td>
      </tr>
    </table>
    <button type="button" class="btn btn-outline-info">Place Order</button>
      `)
    }
  });
});


});
