$("document").ready(function () {
  $.get("~/User/modules/header.html", function (data) {
    $("body").prepend(data);
  });
  $.get("~/User/modules/footer.html", function (data) {
    $("body").append(data);
  });
  $.get("~/User/modules/logout.html", function (data) {
    {
      $("body").prepend(data);
      $(".logout").click(function () {
        $(".logout-modal").css("display", "block");
      });
      $("#btn-quit").click(function () {
        $(".logout-modal").css("display", "none");
      });
      $("#btn-logout").click(function () {
        location.href = "~/User/HomepageNoUser/index.html"
      });
    }
  });
});
