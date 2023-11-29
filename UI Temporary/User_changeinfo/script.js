$("document").ready(function () {
  $.get("../modules/header.html", function (data) {
    $("body").prepend(data);
  });
  $.get("../modules/footer.html", function (data) {
    $("body").append(data);
  });
});

// Popup
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("btn-done");

// When the user clicks on <span> (x), close the modal
btn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var toggleButton = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "Show";
  }
}

function updateInterface(editMode) {
  var buttonSection = document.querySelector(".button-section");
  var modal = document.getElementById("modal");

  if (editMode) {
    buttonSection.innerHTML = `
  <button class="done" id="done" style="width: 56px;">Xong</button>
  <button class="cancel" style="width: 56px;">Hủy</button>
`;
    document.getElementById("done").addEventListener("click", function () {
      modal.style.display = "block";
    });
    document.querySelector(".cancel").addEventListener("click", function () {
      updateInterface(false);
    });
    // Add event listener for 'done' button if needed
  } else {
    buttonSection.innerHTML = `<button class="edit">Chỉnh sửa thông tin cá nhân</button>`;
    document.querySelector(".edit").addEventListener("click", function () {
      updateInterface(true);
    });
  }
}

// Initial setup
updateInterface(false);
