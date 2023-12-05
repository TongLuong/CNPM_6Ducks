$(document).ready(function () {
  $(".hideedit").css("display", "none"); // Initially set the 'hideedit' section to display: none
  $("input, select").prop("readonly", true);
  $("select").prop("disabled", true);

  $(".edit").click(function () {
    $(".showedit").css("display", "none");
    $(".hideedit").css("display", "block");
    $("input, select").prop("readonly", false);
    $("select").prop("disabled", false);
  });

  $(".cancel").click(function () {
    $(".hideedit").css("display", "none");
    $(".showedit").css("display", "block");
    $("input, select").prop("readonly", true);
    $("select").prop("disabled", true);
  });

  $(".done").click(function () {
    $(".modal").css("display", "block");
  });

  $("#btn-done").click(function () {
    $(".modal").css("display", "none");
    $(".hideedit").css("display", "none");
    $(".showedit").css("display", "block");
    $("input, select").prop("readonly", true);
    $("select").prop("disabled", true);
  });

  $(".toggle-password").click(function () {
    var passwordInput = document.getElementById("password");
    var toggleButton = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "Show";
    }
  });
});
