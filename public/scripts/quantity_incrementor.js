$(function() {
  function incrementVal(selector) {
    var $item = selector;
    var currentVal = $item.attr("value");
    $item.attr("value", parseInt(currentVal) + 1 );
  }

  function decreaseVal(selector) {
    var $item = selector;
    var currentVal = $item.attr("value");
    if (currentVal > 1) {
      $item.attr("value", parseInt(currentVal) - 1 );
    }
  }

  $('#increase').click(function() {
    incrementVal($('#quantity'));
  });

  $('#decrease').click(function() {
    decreaseVal($('#quantity'));
  });

});
