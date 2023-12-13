function thisFileUpload() {
    document.getElementById("file").click();
}

var allowFileTypes = [];
function updateFileName(inputElement) {
    var fileName = inputElement.files[0].name;
    var extension = fileName.split('.').pop();
    if (!allowFileTypes.includes("." + extension)) {
        alert("Định dạng tập tin không cho phép!");
        return;
    }

    document.getElementById("show-name").textContent = fileName;
}

$(document).ready(function () {
    $.ajax({
        url: "ManagePrinter/GetAllowedFileType",
        dataType: "json",
        async: false,
        cache: false,
        success: function (response) {
            for (var i = 0; i < response.data.length; i++) {
                allowFileTypes.push(response.data[i]);
            }
        }
    });

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
    var printerIndex, values_others, values_id, values;
    $("#1, #2, #3, #6").click(function () {
        var id = $(this).attr("id");
        //var values;
        
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
        
        var item =
            '<div class="item">' +
            '<img src = "/User/img/printer.png" alt = "" />' +
            '<span>H6 - 107</span>' +
            '</div >';

        for (var i = 0; i < values.length; i++) {
            if (i % 2 == 0)
                $(".printer-list .left-col").append(item);
            else
                $(".printer-list .right-col").append(item);
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

    $(".turnback").click(function () {
        var list = [];
        list.push($(".down-box .building-wrapper"));
        list.push($(".printer-list"));
        list.push($(".printer-pick"));

        for (var i = 1; i < list.length; i++) {
            if (list[i].css("display") != "none") {
                list[i - 1].css("display", "grid");
                list[i].css("display", "none");

                if (i == 1) {
                    $(".printer-list .left-col .item").remove();
                    $(".printer-list .right-col .item").remove();
                }
            }
        }

        /*$(".down-box .building-wrapper").css("display", "grid");
        $(".printer-list").css("display", "none");
        $(".printer-pick").css("display", "none");*/
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
        var e = document.getElementById("size");

        var userID = urlParams.get('id');
        var printerID = values_id[printerIndex];
        var fileName = document.getElementById("show-name").textContent;
        var paperType = e.options[e.selectedIndex].text;
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
                "fileName": fileName, "noPages": noPages,
                "paperType": paperType
            },
            async: false,
            cache: false,
            type: "post"
        });

        /*$.ajax({
            url: "PrintingLog/Print",
            data: {
                "fileName": fileName
            },
            async: false,
            cache: false,
            type: "post"
        });*/

        $(".modal").css("display", "block");
    });

    $(".cancel").click(function () {
        var urlParams = new URLSearchParams(window.location.search);
        var userID = urlParams.get('id');

        location.href = "HomePage" + "?id=" + userID;
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
