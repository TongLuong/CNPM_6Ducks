$(document).ready(function () {
  function setPerOfBar() {
    var x = $(".page-number").text().split(": ")[1];

    $(".bar span").css(
      "width",
      100 * Number(x.split("/")[0] / x.split("/")[1]) + "%"
    );
  }
  setPerOfBar();

  $(".buy-page").click(function (e) {
    e.preventDefault();
    var x = $(".page-number").text().split(": ")[1].split("/");
    if (x[0] < x[1]) {
      x[0]++;
    }
    var y = x[0] + "/" + x[1];
    $(".page-number").text($(".page-number").text().split(": ")[0] + ": " + y);
    setPerOfBar();
  });

  $(".btn.notification p").append(" (2)");
  //action bar href
  $(".action-bar .edit-info, .information .edit-info").click(function () {
    $.ajax({
      url: "/UI Temporary/UserChangeInfo/index.html",
      success: function (response) {
        $.getScript("/UI Temporary/UserChangeInfo/script.js", function () {
          $(".action").html(response);
        });
      },
    });
  });
  $(".action-bar .print-history").click(function () {
    $.ajax({
      url: "/UI Temporary/UserPrintingHistory/index.html",
      success: function (response) {
        $.getScript("/UI Temporary/context/printer-log.js", function () {
          $(".action").html(response);
        });
      },
    });
  });
  $(".action-bar .printing").click(function () {
    $.ajax({
      url: "/UI Temporary/UserPrinting/index.html",
      success: function (response) {
        $.getScript("/UI Temporary/UserPrinting/user-printing.js", function () {
          $(".action").html(response);
        });
      },
    });
  });
  $(".action-bar .notification").click(function () {
    $.ajax({
      url: "/UI Temporary/UserNotification/index.html",
      success: function (response) {
        $(".action").html(response);
      },
    });
  });
  $(".action-bar .buy-page, .information .buy-page").click(function () {
    $.ajax({
      url: "/UI Temporary/UserBuyPage/index.html",
      success: function (response) {
        $(".action").html(response);
      },
    });
  });
});
