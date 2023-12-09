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
    })
});