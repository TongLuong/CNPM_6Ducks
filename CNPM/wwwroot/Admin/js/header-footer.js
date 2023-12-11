$("document").ready(function () {
  $.get("/components/header.html", function (data) {
    $("body").prepend(data);
    $(".nav img").click(function () {
      location.href = "/AdminHomePage";
    });

    if (id != "") {
      console.log(id + "OK");
      $("a.login").hide();
    } else {
      console.log(id);
      $("a.logout").hide();
    }

    $("a.logout").click(function() {
      location.href = "/HomePageNoUser";
    });
  });
  $.get("/components/footer.html", function (data) {
    $("body").append(data);
  });

  var search = new URLSearchParams(window.location.search);
  var id = search.get("id");
});
