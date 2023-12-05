$(document).ready(function () {
  $(".property-list input").attr("disabled", true);

  $("#printer-name ~ span").click(function() {
    if ($(this).text() === "Sửa") {
      $(this).text("Hủy");
      $("input#printer-name").attr("disabled", false);
    } else {
      $(this).text("Sửa");
      $("input#printer-name").attr("disabled", true);
    }
  });

  $(".building-list .item").click(function (e) { 
    e.preventDefault();
    window.location.href = "./add/";
  });
  // $(".building-list .item").click(function (e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url: "./printer-list.html",
  //     success: function (response) {
  //       $.getScript("./script.js", function () {
  //         $(".list.building-list")
  //           .removeClass("building-list")
  //           .addClass("printer-list");
  //         $(".choose.choose-building")
  //           .removeClass("choose-building")
  //           .addClass("choose-printer");
  //         $(".list").html(response);

  //         $(".choose .btn-group").html(
  //           "<button type='button' id='add-printer'>Thêm máy in</button>"
  //         );
  //       });
  //     },
  //   });
  // });

  // $(".printer-list .item").click(function () {
  //   selectItem(this);
  // });

  // $(".btn-group #cancel").click(function () {
  //   cancelBtn(this, $(".list .btn-group #remove-printer").length);
  // });
});
