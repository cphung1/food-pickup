// $(function() {
//   $('#delete_item').click(function () {
//     console.log($(this).parents());
//   });
// });

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/a"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

// $(function() {
//   const checkOutItems = function() {
//     $('#delete_item').click(function () {
//       $.ajax({
//         type: "POST",
//         url: "/",
//         data: $(this).serialize()
//       })
//       .done(function() {
//         let $subtotal = $('#subtotal').text()
//         let $tax = $("#tax").text()
//         let $total = $("total").text()
//         $subtotal = 100;
//     })
//     });
//   };

//   checkOutItems();
// });
