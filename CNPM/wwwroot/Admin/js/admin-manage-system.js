const data = {
  type: "bar",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
    ],
    datasets: [
      {
        label: "Pages",
        data: [30, 15, 62, 65, 61, 80],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        suggestedMax: 100,
        beginAtZero: true,
      },
    },
  },
};

new Chart(document.getElementById("myChart"), data);

$(document).ready(function () {

    

    $("button#done").click(function () {

        var def_no_page = $("#default-number-page").val();
        var time_reset = $("#time-to-reset").val();
        var price = $("#default-price").val();
        var max_print = $("#max-print-per-time").val();
        var file_type = $("#file-type").val();

        $.ajax({
            url: "AdminManageSystem/SaveSystem",
            data: {
                "defNoPage": def_no_page, "timeReset": time_reset, "price": price, "maxPrint": max_print, "fileTypes": file_type
            },
            async: false,
            cache: false,
            type: "post"
        })
    });

    $("#download").click(function () {
        var year = (new Date()).getFullYear();

        $.ajax({
            url: "AdminHomePage/ExportReportByYear",
            data: {
                "fileNameByYear": "AnnualReport.csv",
                "year": year
            },
            asycn: false,
            cache: false,
            type: "get",
            success: function (response) {
                $("#file1").attr("href", response.path);
                $(".file").css("color", "#001aa0");

                //window.open(response.path, '_blank');
                //alert("Downloaded");
            }
        });

        $.ajax({
            url: "AdminHomePage/ExportReportByMonth",
            data: {
                "fileNameByMonth": "MonthlyReport.csv",
                "year": year
            },
            async: false,
            cache: false,
            type: "get",
            success: function (response) {
                $("#file2").attr("href", response.path);
                $(".file").css("color", "#001aa0");

                //window.open(response.path, '_blank');
                //alert("Downloaded");
            }
        });

        /*var urlParams = new URLSearchParams(window.location.search);
        var adminID = urlParams.get('id');
        
        location.href = "AdminManageSystem" + "?id=" + adminID;*/
    })
});