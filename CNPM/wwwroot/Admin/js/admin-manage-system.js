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

    var def_no_page = document.getElementById("default-number-page").value;
    var time_reset = document.getElementById("time-to-reset").value;
    var price = document.getElementById("default-price").value;
    var max_print = document.getElementById("max-print-per-time").value;
    var file_type = document.getElementById("file-type").value;

    $("button#done").click(function () {
        $.ajax({
            url: "AdminManageSystem/SaveSystem",
            data: {
                "defNoPage": def_no_page, "timeReset": time_reset, "price": price, "maxPrint": max_print, "fileType": file_type
            },
            async: false,
            cache: false,
            type: "post"
        })

        alert("Update System");
    })

    alert("Test");
});