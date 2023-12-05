$(document).ready(function () {
  $(".choose .list").height($(".property-list").height())

  $(".printer-list .item").click(function() {
    window.location.href = "../remove/";
  });
});