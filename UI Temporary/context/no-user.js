$("document").ready(function () {
  $.get("/UI Temporary/modules/header-out.html", function (data) {
    $("body").prepend(data);
  });
  $.get("/UI Temporary/modules/footer.html", function (data) {
    $("body").append(data);
  });
  $.get("/UI Temporary/modules/login.html", function (data) {
    $("body").prepend(data);
    $(".login").click(function () {
      $(".login-modal").css("display", "flex");
    });
    $("#cancel").click(function () {
      $(".login-modal").css("display", "none");
    });
    $("#in").click(function () {
      location.href = "/UI Temporary/index.html";
    });
  });
});