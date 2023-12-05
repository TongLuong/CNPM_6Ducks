$(document).ready(function () {
    function setPerOfBar() {
        var x = $(".page-number").text().split(": ")[1];

        $(".bar span").css(
            "width",
            100 * Number(x.split("/")[0] / x.split("/")[1]) + "%"
        );
    }
    setPerOfBar();

    $(".btn.notification p").append(" (2)");
    //action bar href
    $(".action-bar .edit-info").click(function () {
        $.ajax({
            url: "HomePage/UserChangeInfo",
            success: function (response) {
                $(".action").html(response);
            },
        });
    });
    $(".action-bar .print-history").click(function () {
        $.ajax({
            url: "HomePage/UserPrintingHistory",
            success: function (response) {
                $(".action").html(response);
            },
        });
    });
    $(".action-bar .printing").click(function (e) {
        e.preventDefault
        $.ajax({
            url: "HomePage/UserPrinting",
            success: function (response) {
                $(".action").html(response);
            },
        });
    });
    $(".action-bar .notification").click(function () {
        $.ajax({
            url: "HomePage/UserNotification",
            success: function (response) {
                $(".action").html(response);
            },
        });
    });
    $(".action-bar .buy-page").click(function () {
        location.href = "HomePage/UserBuyPage"
    });
});
