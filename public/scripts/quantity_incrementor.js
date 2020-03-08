$(function() {
  function incrementVal(selector) {
    let $item = selector;
    let currentVal = $item.attr("value");
    $item.attr("value", parseInt(currentVal) + 1 );
  }

  function decreaseVal(selector) {
    let $item = selector;
    let currentVal = $item.attr("value");
    if (currentVal > 1) {
      $item.attr("value", parseInt(currentVal) - 1 );
    }
  }

  $('#increase').click(function() {
    incrementVal($('#quantity').atrr("class", "<%= item.id %>"));
  });

  $('#decrease').click(function() {
    decreaseVal($('#quantity').atrr("class", "<%= item.id %>"));
  });


});
