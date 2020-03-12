// const { browse, checkoutItems, newOrder, addItem, deleteItem } = require('../../db/queries');


// let checkoutUpdater = function(cb) {                        //Don't have the order_id to use in this file. Can I require it?

//   browse((err, items) => {
//     // if (err) {
//     //   return res.render('error', { err });
//     // }

//     checkoutItems(order_id, (err, itemsInCheckout) => {
//       // if (err) {
//       //   return res.render('error', { err });
//       // }
//       let subtotal = 0; let tax = 0; let grandTotal = 0;
//       for (let i = 0; i < itemsInCheckout.length; i++) {
//         subtotal+= (itemsInCheckout[i].price * itemsInCheckout[i].quantity);
//       }
//       totals.subtotal = Math.round(subtotal*100) / 100;
//       totals.tax = Math.round(subtotal*0.12*100) / 100;
//       totals.total = Math.round((subtotal + subtotal*0.12)*100) / 100;

//       cb({ itemsCheckInCheckout: itemsInCheckout, totals: totals });
//     });
//   });
// }

// const loadItems = function(item, totals) {            Doesnt let me require it in the jquery menuScripts file
//   $('cart').empty();

//   for (let i = 0; i < item.length; i++) {
//     $('cart').prepend (`
//               <article>
//               <form class="deleteButton">
//               <item>
//                 <number>${item[i].quantity}</number>
//                 <itemName>${item[i].name}</itemName>
//               </item>
//               <price>
//                 <p>${item[i].price}</p>
//                 <button type="button" class="deleteClass">
//                   <i class="fas fa-times fa-xs"></i>
//                 </button>
//               </price>
//               <input name="order_id" type="number">
//               <input name="item_id" type="number">
//             </form >
//             </article>
//     `)
//   }
//   $('totals').empty();

//   $('totals').append (`
//   <table style="width:100%">
//   <tr>
//     <th>Subtotal</th>
//     <td id="subtotal">${totals.subtotal}</td>
//   </tr>
//   <tr>
//     <th>Tax</th>
//     <td id="tax">${totals.tax}</td>
//   </tr>
//   <tr>
//     <th>Total</th>
//     <td id="total">${totals.total}</td>
//   </tr>
// </table>
// <button type="button" class="btn btn-outline-info">Place Order</button>
//   `)
// }

// module.exports = { checkoutUpdater, loadItems };
