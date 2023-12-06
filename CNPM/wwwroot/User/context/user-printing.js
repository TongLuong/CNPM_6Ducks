function thisFileUpload() {
  document.getElementById("file").click();
}

function updateFileName(inputElement) {
  var fileName = inputElement.files[0].name;
  document.getElementById("show-name").textContent = fileName;
}

$(document).ready(function () {
  // Danh sách giá trị cho mỗi id
  var values_1 = [];
  var values_1_id = [];
  var values_1_others = [];

  var values_2 = [];
  var values_2_id = [];
  var values_2_others = [];

  var values_3 = [];
  var values_3_id = [];
  var values_3_others = [];

  var values_6 = [];
  var values_6_id = [];
  var values_6_others = [];

  $.ajax({
     url: "ManagePrinter/DisplayPrinters",
     data: { "n": 50 },
     dataType: "json",
     async: false,
     success: function (response) {
        for (var i = 0; i < response.data.length; i++) {
           var val = response.data[i].value;
           var printer_name = val.building + " - " + val.floor + "0" + val.floor;
           var other_params = val.pagesLeft + " " + val.inkLeft;

           if (val.currentState == "Vô hiệu")
              printer_name += " "

           switch (val.building) {
              case "H1":
                if (values_1.indexOf(printer_name) == -1) {
                    values_1.push(printer_name);
                }
                if (values_1_id.indexOf(val.printer_id) == -1) {
                    values_1_id.push(val.printer_id);
                }
                if (values_1_others.indexOf(other_params) == -1) {
                    values_1_others.push(other_params);
                }
                break;
              case "H2":
                if (values_2.indexOf(printer_name) == -1) {
                    values_2.push(printer_name);
                }
                if (values_2_id.indexOf(val.printer_id) == -1) {
                    values_2_id.push(val.printer_id);
                }
                if (values_2_others.indexOf(other_params) == -1) {
                    values_2_others.push(other_params);
                }
                break;
              case "H3":
                if (values_3.indexOf(printer_name) == -1) {
                    values_3.push(printer_name);
                }
                if (values_3_id.indexOf(val.printer_id) == -1) {
                    values_3_id.push(val.printer_id);
                }
                if (values_3_others.indexOf(other_params) == -1) {
                    values_3_others.push(other_params);
                }
                break;
              case "H6":
                if (values_6.indexOf(printer_name) == -1) {
                    values_6.push(printer_name);
                }
                if (values_6_id.indexOf(val.printer_id) == -1) {
                    values_6_id.push(val.printer_id);
                }
                if (values_6_others.indexOf(other_params) == -1) {
                    values_6_others.push(other_params);
                }
                break;
           }
        }
     }
  })
  
  // Thêm sự kiện click cho mỗi id
  var printerIndex, values_others, values_id;
  $("#1, #2, #3, #6").click(function () {
    var id = $(this).attr("id");
    var values;

    // Sử dụng cấu trúc switch để xác định danh sách giá trị tương ứng với mỗi id
    switch (id) {
      case "1":
        values = values_1;
        values_id = values_1_id;
        values_others = values_1_others;
        break;
      case "2":
        values = values_2;
        values_id = values_2_id;
        values_others = values_2_others;
        break;
      case "3":
        values = values_3;
        values_id = values_3_id;
        values_others = values_3_others;
        break;
      case "6":
        values = values_6;
        values_id = values_6_id;
        values_others = values_6_others;
        break;
    }
    
    $(".down-box .building-wrapper").css("display", "none");
    $(".printer-list").css("display", "grid");

    // Chọn tất cả các phần tử span trong .printer-list
    var elements = $(".printer-list span");
    var elements2 = $(".printer-list .item");

    // Duyệt qua từng phần tử và thay đổi giá trị
    elements.each(function (i) {
      $(this).text(values[i]);
    });

    elements2.each(function (i) {
        if (values[i].substr(values[i].length - 1) == " ") {
            $(this).attr("class", "item cant-choose");
        }
        else
            $(this).attr("class", "item");
    });

    // Gắn sự kiện click vào các phần tử span hiện tại và tương lai trong .printer-list
    $(".printer-list").on("click", "span, img", function () {
      if ($(this).closest(".item").hasClass("cant-choose")) {
        // Nếu có, không thực hiện hàm và thoát
        return;
      }

      $(".printer-list").css("display", "none");
      $(".printer-pick").css("display", "flex");

      // Nếu phần tử được nhấp là img, lấy phần tử span gần nhất chứa văn bản
      var text = $(this).is("img")
          ? $(this).siblings("span").text() : $(this).text();

      printerIndex = values.indexOf(text);
      $("#choose").text(text);

      var temp = values_others[printerIndex].split(" ");
      $("#pagesLeft").text(temp[0]);
      $("#inkLeft").text(temp[1] + "%");
    });
  });

  $(".print").click(function () {
    if ($("#choose").text() == "unknown") {
        alert("Vui lòng chọn máy in!");
        return;
    }
    if (document.getElementById("uploadButton") != null) {
        alert("Vui lòng chọn tập tin cần in!");
        return;
    }
    if (document.getElementById("input-pages").value == "") {
        alert("Vui lòng nhập số trang của tập tin!");
        return;
    }
    
    var urlParams = new URLSearchParams(window.location.search);

    var userID = urlParams.get('id');
    var printerID = values_id[printerIndex];
    var fileName = document.getElementById("show-name").textContent;
    var noPages = document.getElementById("input-pages").value;

    // check whether noPages contains only number
    if (!/^\d+$/.test(noPages)) {
        alert("Vui lòng chỉ nhập số!");
        return;
    }

    $.ajax({
        url: "PrintingLog/SavePrintingLog",
        data: {
            "userID": userID, "printerID": printerID,
            "fileName": fileName, "noPages": noPages
        },
        async: false,
        cache: false,
        type: "post"
    })

    $(".modal").css("display", "block");
  });
  $("#btn-done").click(function () {
    $(".modal").css("display", "none");
    $(".printer-pick").css("display", "none");
    $(".down-box .building-wrapper").css("display", "grid");
    // Reset the "show-name" div to its initial state
    document.getElementById("show-name").innerHTML = `
          <div class="up" id="show-name">
            <input type="file" id="file" style="display:none;" onchange="updateFileName(this)" />
            <button class="upload" id="uploadButton" value="Upload" onclick="thisFileUpload();">
                <i class="fa fa-upload" aria-hidden="true"></i>
                Chọn tập tin
            </button>
          </div>`;
  });
});
