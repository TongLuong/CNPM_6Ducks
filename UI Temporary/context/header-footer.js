$("document").ready(function () {
  $.get("/UI Temporary/modules/header.html", function (data) {
    $("body").prepend(data);
  });
  $.get("/UI Temporary/modules/footer.html", function (data) {
    $("body").append(data);
  });
  $.get("/UI Temporary/modules/logout.html", function (data) {
    {
      $("body").prepend(data);
      $(".logout").click(function () {
        $(".logout-modal").css("display", "block");
      });
      $("#btn-quit").click(function () {
        $(".logout-modal").css("display", "none");
      });
      $("#btn-logout").click(function () {
        location.href = "/UI Temporary/HomepageNoUser/index.html"
      });
    }
  });
});
