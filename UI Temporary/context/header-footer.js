$("document").ready(function () {
  $.get("/UI Temporary/modules/header.html", function (data) {
    $("body").prepend(data);
  });
  $.get("/UI Temporary/modules/footer.html", function (data) {
    $("body").append(data);
  });
});