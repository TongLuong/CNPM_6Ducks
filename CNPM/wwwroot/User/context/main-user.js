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
    $(".action-bar .edit-info, .information .edit-info").click(function () {
        $.ajax({
            url: "HomePage/UserChangeInfo",
            success: function (response) {
                $.getScript("/User/context/user-change-info.js", function () {
                    $(".action").html(response);
                });
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
                $.getScript("/User/context/user-printing.js", function () {
                    $(".action").html(response);
                });
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
    $(".action-bar .buy-page, .information .buy-page").click(function () {
        $.ajax({
            url: "HomePage/UserBuyPage",
            success: function (response) {
                $(".action").html(response);
                $(".pay").click(function () {
                    $(".modal").css("display", "block");
                    $("body, html").css("overflow", "hidden")
                });
                $("#btn-done").click(function () {
                    $(".modal").css("display", "none");
                    $("body, html").css("overflow", "auto")
                    $('input[type="checkbox"]').prop('checked', false);
                });
                $(".cancel").click(function () {
                    $('input[type="checkbox"]').prop('checked', false);
                    $('select').prop('checked', false);
                });
                
                $("#view-buying-log").click(function() {
                    $(".user-buying-log").toggle();
                });

                $("input").change(function () {
                    var price = parseInt(Number($(this).val()) * 500).toLocaleString() + "đ";
                    $(".sum-page .sum").text(price);
                });

                const checkboxes = document.querySelectorAll('.check');
                checkboxes.forEach(function (checkbox) {
                    checkbox.addEventListener('change', function () {
                        checkboxes.forEach(function (c) {
                            if (c !== checkbox) c.checked = false;
                        });
                    });
                });
                function resetSelect() {
                    document.getElementById('account').selectedIndex = 0;
                }
            },
        });
    });

    function showBuyPageLogItem(transactionCode, time, nopage,price) {
        $.get("components/buy-page.html", function (data) {
            $(".result").append(data);
            var item = $(".result .buy-page-item:last-child()");
            item.find(".transaction-code").text(transactionCode);
            item.find("time").text(time);
            item.find("nopage").text(nopage);
            item.find("price").text(price);
        }
        );
    }

    function displayBuyPageLog(userID) {
        $.get("PrintingLog/ShowPrintingLog", { "userID": userID },
            function (response) {
                for (let i = 0; i < response.number; i++) {
                    showBuyPageLogItem(response.transactionCode, response.time, response.numberOfPage, response.price);
                }
            }
        )
    }
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    displayBuyPageLog(id);
});
