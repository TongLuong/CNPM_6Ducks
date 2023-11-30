$(document).ready(function () {
  function setPerOfBar() {
    var x = $(".page-number").text().split(": ")[1];

    $(".bar span").css("width", 100 * Number(x.split("/")[0] / x.split("/")[1]) + "%");
  }
  setPerOfBar();

  $(".buy-page").click(function (e) { 
    e.preventDefault();
    var x = $(".page-number").text().split(": ")[1].split("/");
    if (x[0] < x[1]) {x[0]++};
    var y = x[0] + "/" + x[1];
    $(".page-number").text($(".page-number").text().split(": ")[0] + ": " + y);
    setPerOfBar();
  });
});