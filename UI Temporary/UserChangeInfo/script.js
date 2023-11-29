$("document").ready(function () {
  $(".hideedit").css("display", "none"); // Initially set the 'hideedit' section to display: none
  $("input, select").prop("readonly", true);

  $(".edit").click(function () {
    $(".showedit").css("display", "none");
    $(".hideedit").css("display", "block");
    $("input, select").prop("readonly", false);
  });

  $(".cancel").click(function () {
    $(".hideedit").css("display", "none");
    $(".showedit").css("display", "block");
    $("input, select").prop("readonly", true);
  });

  $(".done").click(function () {
    $(".modal").css("display", "block");
  });

  $("#btn-done").click(function () {
    $(".modal").css("display", "none");
    $(".hideedit").css("display", "none");
    $(".showedit").css("display", "block");
    $("input, select").prop("readonly", true);
  });
});
