$(function() {
  // function incrementVal(selector) {
  //   let $item =  selector;
  //   console.log($item)
  //   let currentVal = $item.attr("value");
  //   $item.attr("value", parseInt(currentVal) + 1 );
  // }

  // function decreaseVal(selector) {
  //   let $item = selector;
  //   let currentVal = $item.attr("value");
  //   if (currentVal > 1) {
  //     $item.attr("value", parseInt(currentVal) - 1 );
  //   }
  // }

  // $('#increase').click(function() {
  //   console.log($('#quantity'));
  //   incrementVal($('#quantity'));
  // });

  // $('#decrease').click(function() {
  //   decreaseVal($('quantity').find('input').attr('id'));
  // });

  $(".increase").click(function() {
    updateValue(this, 1);
  });
  $(".decrease").click(function() {
      updateValue(this, -1);
  });

  function updateValue(obj, delta) {
      let item = $(obj).parent().find("input");
      let newValue = parseInt(item.val(), 10) + delta;
      item.val(Math.max(newValue, 1));
  }

});
