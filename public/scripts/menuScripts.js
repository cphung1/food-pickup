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

  //-------------------------------------Side-bar navigation---------------------------------
  let height = $(window).height();

  $("#coffee_id").click(function() {
    window.scrollTo(0, 280);
    // #submitStuff-4.scrollIntoView();
    // console.log("The height in this example is", height);
  });

  $("#food_id").click(function() {
    window.scrollTo(0, 800);
  });

  $("#tea_id").click(function() {
    window.scrollTo(0, 1520);
  });
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
        const item = data['itemsCheckInCheckout'];
        const totals = data['totals'];
        // const arr = item;
        // let price = 0;
        // arr.forEach(function(element, index) {
        //   console.log(element.price, element.quantity)
        //   price = (Math.round((item.price  * item.quantity) * 100) / 100).toFixed(2)
        // })
        loadItems(item, totals);
        $(`#${$inputModal}`).modal("hide")
        $('#collapse1').addClass("panel-collapse collapse show")
      }
    });
    // open(location, '_self').close();
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
        if (item.length === 0) {
          $('#collapse1').removeClass("panel-collapse collapse show")
          $('#collapse1').addClass("panel-collapse collapse")
        }
        console.log(item.length)
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

//Load items in cart on refresh
$(window).on('load', function(){
  event.preventDefault();
  const $inputData = null;
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
//---------------------------------------Helper Functions------------------------------------//
const loadItems = function(item, totals) {
  $('cart').empty();
  for (let i = 0; i < item.length; i++) {
    $('cart').append(`
              <article style='margin-bottom: 5%;'>
              <form>
              <item>
                <number>${item[i].quantity}</number>
                <itemName>${item[i].name}</itemName>
              </item>
              <price id="deleteId">
                <p>$${item[i].price}</p>
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
    <th class='subtotal_class'>Subtotal</th>
    <td id="subtotal" class='subtotal_class'>$${totals.subtotal}</td>
  </tr>
  <tr>
    <th>Tax</th>
    <td id="tax">$${totals.tax}</td>
  </tr>
  <tr>
    <th>Total</th>
    <td id="total">$${totals.total}</td>
  </tr>
</table>
  `);
};
