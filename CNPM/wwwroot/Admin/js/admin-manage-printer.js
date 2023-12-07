$(document).ready(function () {
  $(".choose .list").height($(".property-list").height());
  $("input").prop("readonly", true);

  $(".noti").hide();

  $(".property-list input").attr("disabled", true);

  $("#printer-name ~ span").click(function () {
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

  $(".printer-list .item:not(.disabled)").click(function () {
    $(".item.selected").toggleClass("selected");
    $(this).toggleClass("selected");
    if ($(".item.selected").length === 0) {
      $(".choose .btn-group").html("");
    } else {
      $(".choose .btn-group").html(
        $("<button type='button' id='remove-printer'>Xóa máy in</button>")
      );
      $("#remove-printer").click(function () {
        $(".noti").show();
        $.ajax({
          url: "./noti.html",
          success: function (response) {
            $(".noti").html(response);
            $("body").css("overflow", "hidden");
            $(".noti > :nth-child(2)").hide();

            $("#cancel-remove, #done-remove").click(function () {
              $(".noti").hide();
              $("body").css("overflow", "scroll");
            });

            $("#confirm-remove").click(function () {
              $(".noti > :nth-child(2)").show();
              $(".noti > :first-child").hide();
              $(".item.selected").remove();
            });
          },
        });
      });
    }
    $.ajax({
      url: "../info.json",
      dataType: "json",
      success: function (data) {
        const prop = Object.keys(data.printer[0]);
        for (let i = 0; i < prop.length; i++) {
          $("#" + prop[i]).val(data.printer[0][prop[i]]);
        }
      },
      error: function (error) {
        return error;
      },
    });
  });

  $(".main ~ .btn-group #cancel").click(function () {
    $(".item.selected").toggleClass("selected");
    $(".choose .btn-group").html(
      "<button type='button' id='add-printer'>Thêm máy in</button>"
    );
    $("input").val("");
  });
});
