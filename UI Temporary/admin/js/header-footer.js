$("document").ready(function () {
  $.get("/UI Temporary/modules/header.html", function (data) {
    $("body").prepend(data);
    $(".nav img").click(function() {
      location.href = "/UI Temporary/admin";
    });
  });
  $.get("/UI Temporary/modules/footer.html", function (data) {
    $("body").append(data);
  });
});