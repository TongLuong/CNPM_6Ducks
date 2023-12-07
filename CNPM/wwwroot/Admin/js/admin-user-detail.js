$(document).ready(function () {
  $(".switch-button div").click(function () {
    if (!$(this).hasClass("selected")) {
      $(".switch-button .selected").toggleClass("selected");
      $(this).toggleClass("selected");
      $(".right .display").toggleClass("disabled");
    }
  });

  $("#block-user").click(function() {
    var x = 
    `<div class="wrapper popup">
      
    </div>`
  });

  $("#ban-user").click(function() {

  });
});
