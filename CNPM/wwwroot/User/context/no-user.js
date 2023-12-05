$("document").ready(function () {
  $.get("/User/modules/header-out.html", function (data) {
    $("body").prepend(data);
  });
  $.get("/User/modules/footer.html", function (data) {
    $("body").append(data);
  });
  $.get("/User/modules/login.html", function (data) {
    $("body").prepend(data);
    $(".login").click(function () {
      $(".login-modal").css("display", "flex");
    });
    $("#cancel").click(function () {
      $(".login-modal").css("display", "none");
    });
      $("#in").click(function () {
          var user = document.getElementsByName("username")[0].value;
          var pass = document.getElementsByName("password")[0].value;
          $.get
          (
              "HomePage/CheckLogin", {"username": user, "password": pass},
              function (response) {
                  if (response.userID != '')
                      location.href = "HomePage" + "?id=" + response.userID;
                  else
                      location.href = "HomePageNoUser";
              }
          )
    });
  });
});