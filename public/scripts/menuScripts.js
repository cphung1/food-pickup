//----------------------------------------JQUERY FUNCTIONS--------------------------------//
$(document).ready(function() {
//-----------------------------------------------Login Features------------------------
  let is_logged_in = document.cookie;

  console.log(is_logged_in);
  if (!is_logged_in) {
    $(".login_button").click(function(event) {
      event.preventDefault();
      $("login_form").css("display", "none");
      $('top_bar').append(`<p>Logged in as Cathy</p>`);
      $('top_bar').css("font-weight", "bold");
      document.cookie = "is_logged_in=true";
    });
  } else {
    $("login_form").css("display", "none");
    $('top_bar').append(`<p>Logged in as Cathy</p>`);
    $('top_bar').css("font-weight", "bold");
  }

  //------------------------------------------Checkout Functions-------------------------------
  //Add items to cart
  $('.addItemButton').click(function() {
    const $inputData = $(this).parent().serialize();
    const $inputModal = $(this).parent().parent().parent().parent().parent().parent().attr('id')
    $.ajax({
      type: 'POST',
      url: '/apis/checkoutItems',
      data: ($inputData),
      success: function(data) {
        let item = data['itemsCheckInCheckout'];
        let totals = data['totals'];
        loadItems(item, totals);
        $(`#${$inputModal}`).modal("hide")
      }
    });
  });

  //Delete items from cart
  $(document).on('click', '.deleteClass', function() {
    event.preventDefault();
    const $inputData = $(this).attr('id');
    const inputObj = { item_id: $inputData };
    $.ajax({
      type: 'POST',
      url: '/apis/deleteItems',
      data: (inputObj),
      success: function(data) {
        let item = data['itemsCheckInCheckout'];
        let totals = data['totals'];
        loadItems(item, totals);
      }
    });
  });

  // redirects user once customer has placed order
  $('#place_order').click(function() {
    $.ajax({
      type: 'POST',
      url: '/apis/confirmed/:id',
      success: function(data){
        document.location.href = `/confirmed/${data}`;
      }
    })
  })
});

//---------------------------------------Helper Functions------------------------------------//
const loadItems = function(item, totals) {
  $('cart').empty();
  for (let i = 0; i < item.length; i++) {
    $('cart').append(`
              <article>
              <form>
              <item>
                <number>${item[i].quantity}</number>
                <itemName>${item[i].name}</itemName>
              </item>
              <price id="deleteId">
                <p>${item[i].price}</p>
                <button type="button" class="deleteClass" id=${item[i].id}>
                  <i class="fas fa-times fa-xs"></i>
                </button>
              </price>
              <input name="order_id" type="number">
              <input name="item_id" type="number">
            </form >
            </article>
    `);
  }
  $('totals').empty();

  $('totals').append(`
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
  `);
};
