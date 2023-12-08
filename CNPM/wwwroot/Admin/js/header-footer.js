$("document").ready(function () {
  $.get("/components/header.html", function (data) {
    $("body").prepend(data);
    $(".nav img").click(function() {
      location.href = "/AdminHomePage";
    });
  });
  $.get("/components/footer.html", function (data) {
    $("body").append(data);
  });
});