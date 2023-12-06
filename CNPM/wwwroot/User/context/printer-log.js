$(document).ready(function () {
  $(".log-item .time").width($(".title .time").width());
  $(".log-item .printer").width($(".title .printer").width());
  $(".log-item .page").width($(".title .page").width());
  $(".log-item .size").width($(".title .size").width());
  $(".log-item .total").width($(".title .total").width());
  $(".log-item .status").width($(".title .status").width());
    $(".log-table").height(10 * $(".item").height() + 80 + "px");

    function showPrintingLogItem(name, time, printer, nopage) {
        $.get("components/printing-log.html", function (data) {
            $(".log-table").append(data);
            var item = $(".log-table .log-item:last-child()");
            item.find(".name").text(name);
            item.find("time").text(time);
            item.find("printer").text(printer);
            item.find("nopage").text(nopage);
            item.find("total").text(nopage);
        }
        );
    }

    function displayPrintingLog(userID) {
        $.get("PrintingLog/ShowPrintingLog", { "userID": userID },
            function (response) {
                for (let i = 0; i < response.number; i++) {
                    showPrintingLogItem(response.filename, response.time, response.numberOfPage, response.price);
                }
            }
        )
    }
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    displayPrintingLog(id);
});


