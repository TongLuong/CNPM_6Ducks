$(document).ready(function () {
  getInfo();
  function getInfo() {
    $.ajax({
      url: "./info.json",
      dataType: "json",
      success: function (data) {
        const prop = Object.keys(data.admin[0]);
        $(".avatar").attr("src", data.admin[0]["avatar"]);
        $(".username").text(data.admin[0]["fullname"]);
        $(".department").text(data.admin[0]["department"]);
        for (let i = 0; i < prop.length; i++) {
          $("#" + prop[i]).val(data.admin[0][prop[i]]);
        }
      },
      error: function (error) {
        return error;
      },
    });
  }
  $(".hideedit").css("display", "none"); // Initially set the 'hideedit' section to display: none
  $("input, select").prop("readonly", true);
  $("select").prop("disabled", true);

  $(".edit").click(function () {
    $(".showedit").css("display", "none");
    $(".hideedit").css("display", "block");
    $("#fullname, #bdate, #phone_number, #password").prop("readonly", false);
  });

  $(".cancel").click(function () {
    $(".hideedit").css("display", "none");
    $(".showedit").css("display", "block");
    $("#fullname, #bdate, #phone_number, #password").prop("readonly", true);
    getInfo();
  });

  $(".done").click(function () {
    $(".modal").css("display", "block");
  });

  $("#btn-done").click(function () {
    $(".modal").css("display", "none");
    $(".hideedit").css("display", "none");
    $(".showedit").css("display", "block");
    $("#fullname, #bdate, #phone_number, #password").prop("readonly", true);
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
