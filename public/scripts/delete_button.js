// $(function() {
//   $('#delete_item').click(function () {
//     console.log($(this).parents());
//   });
// });

$(() => {
  $.ajax({
    method: "GET",
    url: "/a"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
