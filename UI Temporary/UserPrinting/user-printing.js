$(document).ready(function () {
  // Danh sách giá trị cho mỗi id
  var values_1 = [
    "H1 101",
    "H1 202",
    "H1 303",
    "H1 404",
    "H1 505",
    "H1 606",
    "H1 707",
    "H1 808",
  ];
  var values_2 = [
    "H2 101",
    "H2 202",
    "H2 303",
    "H2 404",
    "H2 505",
    "H2 606",
    "H2 707",
    "H2 808",
  ];
  var values_3 = [
    "H3 101",
    "H3 202",
    "H3 303",
    "H3 404",
    "H3 505",
    "H3 606",
    "H3 707",
    "H3 808",
  ];
  var values_6 = [
    "H6 101",
    "H6 202",
    "H6 303",
    "H6 404",
    "H6 505",
    "H6 606",
    "H6 707",
    "H6 808",
  ];

  // Thêm sự kiện click cho mỗi id
  $("#1, #2, #3, #6").click(function () {
    var id = $(this).attr("id");
    var values;

    // Sử dụng cấu trúc switch để xác định danh sách giá trị tương ứng với mỗi id
    switch (id) {
      case "1":
        values = values_1;
        break;
      case "2":
        values = values_2;
        break;
      case "3":
        values = values_3;
        break;
      case "6":
        values = values_6;
        break;
    }

    $(".down-box .building-wrapper").css("display", "none");
    $(".printer-list").css("display", "grid");

    // Chọn tất cả các phần tử span trong .printer-list
    var elements = $(".printer-list span");

    // Duyệt qua từng phần tử và thay đổi giá trị
    elements.each(function (i) {
      $(this).text(values[i]);
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
        ? $(this).siblings("span").text()
        : $(this).text();

      $("#choose").text(text);
    });
  });
});
