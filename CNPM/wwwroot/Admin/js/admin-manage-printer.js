$(document).ready(function () {
  $(".choose .list").height($(".property-list").height());
  $("input").prop("readonly", true);
  $(".printer-list").hide();

  $("#printer-name ~ span").click(function () {
    if ($(this).text() === "Sửa") {
      $(this).text("Xong");
      $("input#printer-name").attr("readonly", false);
    } else {
      $(this).text("Sửa");
      $("input#printer-name").attr("readonly", true);
    }
  });

  $(".printer-list .item:not(.disabled)").click(function () {
    $(".item.selected").toggleClass("selected");
    $(this).toggleClass("selected");
    if ($(".item.selected").length === 0) {
      $(".choose .btn-group").html("");
    } else {
      $(".choose .btn-group").html(
        $("<button type='button' id='remove-printer'>Xóa máy in</button>")
      );
    }
  });

  $(".main ~ .btn-group #cancel").click(function () {
    if ($(".item.selected").length === 0) {
      $(".building-list").show();
      $(".printer-list").hide();
    } else {
      $(".item.selected").toggleClass("selected");
      $("input").val("");
    }
  });

  $(".building-list .item").click(function () {
    var list = this.className.split(" ")[1];
    console.log(list);
    $(".choose")
      .find(" > ." + list)
      .show();
    $(".building-list").hide();
  });
});
