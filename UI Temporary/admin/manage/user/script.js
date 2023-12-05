$(document).ready(function () {
  $("#myDropdown div").click(function() {
    $(".dropdown").has(this).find("span").text($(this).text());
  });
});