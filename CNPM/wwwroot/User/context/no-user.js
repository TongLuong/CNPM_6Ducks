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
              "Login/CheckLogin", {"username": user, "password": pass},
              function (response) {
                  if (response.id != '') {
                      if (response.type == 0)
                          location.href = "AdminHomePage" + "?id=" + response.id;
                      else if (response.type > 0)
                          location.href = "HomePage" + "?id=" + response.id;
                  }
                  else {
                      $("#msg").text("Đăng nhập thất bại, vui lòng thử lại");
                  }
              }
          )
    });
  });
});