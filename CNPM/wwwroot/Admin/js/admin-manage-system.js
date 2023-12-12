$(document).ready(function () {
    $("input").prop("readonly", true);

    $("button#done").click(function () {
        $(".managesystem > .btn-group").toggleClass("hide");

        var def_no_page = $("#default-number-page").val();
        var time_reset = $("#time-to-reset").val();
        var price = $("#default-price").val();
        var max_print = $("#max-print-per-time").val();
        var file_type = $("#file-type").val();

        $.ajax({
            url: "AdminManageSystem/SaveSystem",
            data: {
                defNoPage: def_no_page,
                timeReset: time_reset,
                price: price,
                maxPrint: max_print,
                fileTypes: file_type,
            },
            async: false,
            cache: false,
            type: "post",
        });
    });

    $("#download").click(function () {
        var year = new Date().getFullYear();

        $.ajax({
            url: "AdminHomePage/ExportReportByYear",
            data: {
                fileNameByYear: "AnnualReport.csv",
                year: year,
            },
            asycn: false,
            cache: false,
            type: "get",
            success: function (response) {
                $("#file1").attr("href", response.path);
                $(".file").css("color", "#001aa0");

                //window.open(response.path, '_blank');
                //alert("Downloaded");
            },
        });

        $.ajax({
            url: "AdminHomePage/ExportReportByMonth",
            data: {
                fileNameByMonth: "MonthlyReport.csv",
                year: year,
            },
            async: false,
            cache: false,
            type: "get",
            success: function (response) {
                $("#file2").attr("href", response.path);
                $(".file").css("color", "#001aa0");

                //window.open(response.path, '_blank');
                //alert("Downloaded");
            },
        });
        /*var urlParams = new URLSearchParams(window.location.search);
            var adminID = urlParams.get('id');
            
            location.href = "AdminManageSystem" + "?id=" + adminID;*/
    });

    async function getTotalPrint() {
        try {
            var response = await $.ajax({
                url: "AdminManageSystem/LoadTotalPrint",
                data: {
                    year: 2023,
                },
                type: "GET",
            });

            $("#totalprint").text(response);
            return response;
        } catch (error) {
            console.log(error);
            // Handle errors, if needed
            // ...
            throw error; // Optional: rethrow the error to propagate it further
        }
    }

    async function getTotalPage() {
        try {
            var response = await $.ajax({
                url: "AdminManageSystem/LoadTotalPageA4",
                data: {
                    year: 2023,
                    month: 12,
                },
                type: "GET",
            });

            $("#totalpage").text(response);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    function getStatPage() {
        $.ajax({
            url: "AdminManageSystem/StatTotalPage",
            data: {
                year: 2023,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                createChart(response.month, response.total_page, "myChart-2", "pages");
            },
        });
    }

    Promise.all([getTotalPrint(), getTotalPage()])
        .then(function (results) {
            createChart(
                ["Total Prints", "Total A4 Pages"],
                results,
                "myChart-1",
                "counts"
            );
        })
        .catch(function (error) {
            console.log(error);
        });

    function createChart(dataLabel, dataValue, chart, label) {
        var maxWidth = 120 / dataValue.length;
        var maxValue = Math.max(...dataValue) + 5;

        console.log(maxWidth, maxValue);
        const data = {
            type: "bar",
            data: {
                labels: dataLabel,
                datasets: [
                    {
                        label: label,
                        data: dataValue,
                        borderWidth: 1,
                        barThickness: maxWidth,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        suggestedMax: maxValue,
                        beginAtZero: true,
                    },
                },
            },
        };

        new Chart(document.getElementById(chart), data);
    }

    function display_system() {
        $.get("AdminManageSystem/LoadSystem", function (response) {
            $("#default-number-page").val(response.default_no_page);
            $("#time-to-reset").val(response.resetdate);
            $("#default-price").val(response.page_price);
            $("#max-print-per-time").val(response.max_print_per);
            $("#file-type").val(response.file_type);
        });
    }

    getStatPage();
    $("#chart").click(function () {
        $("#myChart-1").toggle("hide");
        $("#myChart-2").toggle("hide");
    });

    $("#myChart-2").hide();

    $("#edit").click(function () {
        $(".managesystem > .btn-group").toggleClass("hide");
        $("input").prop("readonly", false);
    })

    $("#cancel").click(function () {
        $(".managesystem > .btn-group").toggleClass("hide");
        $("input").prop("readonly", true);
    })

    display_system();
});
