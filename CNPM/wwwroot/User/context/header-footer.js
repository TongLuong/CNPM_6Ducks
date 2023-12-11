$("document").ready(function () {
  $.get("/User/modules/header.html", function (data) {
    $("body").prepend(data);

    if (id != "") {
      console.log(id + "OK");
      $("a.login").hide();
    } else {
      console.log(id);
      $("a.logout").hide();
    }
  });
  $.get("/User/modules/footer.html", function (data) {
    $("body").append(data);
  });
  $.get("/User/modules/logout.html", function (data) {
    {
      $("body").prepend(data);
      $(".logout").click(function () {
        $(".logout-modal").css("display", "block");
      });
      $("#btn-quit").click(function () {
        $(".logout-modal").css("display", "none");
      });
      $("#btn-logout").click(function () {
        location.href = "HomepageNoUser"
      });
    }
  });
});
