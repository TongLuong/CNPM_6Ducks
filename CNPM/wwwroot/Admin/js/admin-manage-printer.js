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

  function itemClick() {
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

      console.log(
        printer[$(this).attr("class").split(" ")[1].split("-")[1]].floor
      );

      $.ajax({
        url: "AdminManagePrinter/ShowPrinter",
        data: {
          building:
            printer[$(this).attr("class").split(" ")[1].split("-")[1]].building,
          floorStr:
            printer[$(this).attr("class").split(" ")[1].split("-")[1]].floor,
        },
        dataType: "json",
        async: false,
        success: function (response) {
          display_printer_info(
            response.name,
            response.brand,
            response.currentState,
            response.pageLeft,
            response.inkLeft,
            response.totalPrinted
          );
        },
      });
    });
  }

  $(".main ~ .btn-group #cancel").click(function () {
    if ($(".item.selected").length === 0) {
      $(".building-list").show();
      $(".printer-list").hide();
    } else {
      $(".item.selected").toggleClass("selected");
      $("input").val("");
    }
  });

  var printer = [
    {
      name: "",
      building: "",
      floor: "",
      id: "",
      status: "",
    },
  ];
  $.ajax({
    url: "AdminManagePrinter/DisplayAllPrinter",
    dataType: "json",
    async: false,
    success: function (response) {
      console.log(response);
      for (var i = 0; i < response.building.length; i++) {
        printer[i] = {
          name:
            response.building[i] +
            "-" +
            response.floor[i] +
            "0" +
            response.floor[i],
          building: response.building[i],
          floor: response.floor[i],
          id: i,
          status: response.currentState[i],
        };

        var buildingID = response.building[i][1];
        var item =
          `<div class="item item-` +
          i +
          `">
            <img src="/Admin/img/printer.svg" alt="" />
            <span>` +
          printer[i].name +
          `</span>
        </div>`;
        $(".list.building-" + buildingID).append(item);
        itemClick();
      }
    },
  });

  function display_printer_info(
    name,
    brand,
    status,
    pageLeft,
    inkLeft,
    total_printed
  ) {
    $("input[name = 'printer-name']").val(name);
    $("input[name = 'firm']").val(brand);
    $("input[name = 'status']").val(status);
    $("input[name = 'remain-page']").val(pageLeft);
    $("input[name = 'remain-ink']").val(inkLeft);
    $("input[name = 'used-page']").val(total_printed);
  }

  $(".building-list .item").click(function () {
    var building = $(this).attr("class").split(" ")[1];
    $(".choose")
      .find(" > ." + building)
      .show();
    $(".building-list").hide();
  });

  //   $(".building-list .item").click(function () {
  //     var id = $(this).attr("class").split(" ")[1].split("-")[1];
  //     var values;
  //     console.log(id);
  //     var building = $(this).attr("class").split(" ")[1];
  //     console.log(building);
  //     Sử dụng cấu trúc switch để xác định danh sách giá trị tương ứng với mỗi id
  //     switch (id) {
  //       case "1":
  //         values = values_1;
  //         values_id = values_1_id;
  //         values_others = values_1_others;
  //         break;
  //       case "2":
  //         values = values_2;
  //         values_id = values_2_id;
  //         values_others = values_2_others;
  //         break;
  //       case "3":
  //         values = values_3;
  //         values_id = values_3_id;
  //         values_others = values_3_others;
  //         break;
  //       case "6":
  //         values = values_6;
  //         values_id = values_6_id;
  //         values_others = values_6_others;
  //         break;
  //     }

  //     //$(".down-box .building-wrapper").css("display", "none");
  //     //$(".printer-list").css("display", "grid");

  //     // Chọn tất cả các phần tử span trong .printer-list
  //     var elements = $(".printer-list span");
  //     var elements2 = $(".printer-list .item");

  //     // Duyệt qua từng phần tử và thay đổi giá trị
  //     elements.each(function (i) {
  //       $(this).text(values[i]);
  //     });

  //     elements2.each(function (i) {
  //       if (values[i].substr(values[i].length - 1) == " ") {
  //         $(this).attr("class", "item cant-choose");
  //       } else $(this).attr("class", "item");
  //     });

  //     // Gắn sự kiện click vào các phần tử span hiện tại và tương lai trong .printer-list
  //     $(".printer-list").on("click", "span, img", function () {
  //       if ($(this).closest(".item").hasClass("cant-choose")) {
  //         // Nếu có, không thực hiện hàm và thoát
  //         return;
  //       }

  //       $(".printer-list").css("display", "none");
  //       $(".printer-pick").css("display", "flex");

  //       // Nếu phần tử được nhấp là img, lấy phần tử span gần nhất chứa văn bản
  //       var text = $(this).is("img")
  //         ? $(this).siblings("span").text()
  //         : $(this).text();

  //       $.get(
  //         "AdminManagePrinter/ShowPrinter",
  //         { building: text.substr(0, 2), floor: text.substr(5, 3) },
  //         function (response) {
  //           for (let i = 0; i < response.number; i++) {
  //             display_printer_info(
  //               response.name[i],
  //               response.brand[i],
  //               response.currentState[i],
  //               response.pageLeft[i],
  //               response.inkLeft[i],
  //               response.total_printed[i]
  //             );
  //           }
  //         }
  //       );

  //       printerIndex = values.indexOf(text);
  //       $("#choose").text(text);

  //       var temp = values_others[printerIndex].split(" ");
  //       $("#pagesLeft").text(temp[0]);
  //       $("#inkLeft").text(temp[1] + "%");
  //     });
  //   });
});
