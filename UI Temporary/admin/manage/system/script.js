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
  
});