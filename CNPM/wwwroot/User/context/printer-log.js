$(document).ready(function () {
  $(".log-item .time").width($(".title .time").width());
  $(".log-item .printer").width($(".title .printer").width());
  $(".log-item .page").width($(".title .page").width());
  $(".log-item .size").width($(".title .size").width());
  $(".log-item .total").width($(".title .total").width());
  $(".log-item .status").width($(".title .status").width());
  $(".log-table").height(10 * $(".item").height() + 80 + "px");
});
