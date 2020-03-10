$(function() {
  $(".increase").click(function() {
    updateValue(this, 1);
  });

  $(".decrease").click(function() {
    updateValue(this, -1);
  });

  $('.qty').hover(function() {
    event.preventDefault();
    $(this).blur();
  });

  function updateValue(obj, delta) {
    let item = $(obj).parent().find("input");
    let newValue = parseInt(item.val(), 10) + delta;
    item.val(Math.max(newValue, 1));
  }

});
