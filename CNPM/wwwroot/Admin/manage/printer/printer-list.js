function selectItem(item) {
  $(".printer-list .item").css("border-color", "rgba(0, 0, 0, 0.1 )");
  $(item).css("border-color", "rgba(0, 0, 0, 0.9)");
  $(".choose .btn-group").html(
    $("<button type='button' id='remove-printer'>Xóa máy in</button>")
  );
}

function cancelBtn(btn, n) {
  if (n === 0) {
    console.log(n);
    $.ajax({
      url: "./building-list.html",
      success: function (response) {
        $.getScript("./script.js", function () {
          $(".list.printer-list")
            .removeClass("printer-list")
            .addClass("building-list");
          $(".choose.choose-printer")
            .removeClass("choose-printer")
            .addClass("choose-building");
          $(".list").html(response);

          $(".choose .btn-group").html("");
        });
      },
    });
  } else {
    console.log(n+1);
    $(".printer-list .item").css("border-color", "rgba(0, 0, 0, 0.1 )");
    $(".choose .btn-group").html(
      $("<button type='button' id='remove-printer'>Xóa máy in</button>")
    );
  }
}
