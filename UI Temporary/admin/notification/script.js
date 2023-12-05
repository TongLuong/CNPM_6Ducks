$(document).ready(function () {
  $("#start-send").click(function() {
    $(".managesystem").toggleClass("disabled");
  });

  $("#cancel").click(function() {
    $(".managesystem").toggleClass("disabled");
  });

  $("#confirm-send").click(function() {
    alert("Thông báo đã được gửi đến tất cả mọi người");
  });
});