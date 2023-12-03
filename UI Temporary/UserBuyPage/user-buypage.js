$(document).ready(function () {
  $(".pay").click(function () {
    $(".modal").css("display", "block");
  });
  $("#btn-done").click(function () {
    $(".modal").css("display", "none");
    $('input[type="checkbox"]').prop('checked', false);
  });
  $(".cancel").click(function () {
    $('input[type="checkbox"]').prop('checked', false);
    $('select').prop('checked', false);
  });
});
