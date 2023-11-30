// Chart
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
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Data",
        data: [30, 15, 62, 65, 61, 65, 40, 33, 65, 10, 80, 70],
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
