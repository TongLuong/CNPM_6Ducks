$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var userID = urlParams.get('id');

    $(".hideedit").css("display", "none"); // Initially set the 'hideedit' section to display: none
    $("input, select").prop("readonly", true);
    $("select").prop("disabled", true);

    $(".edit").click(function () {
        $(".showedit").css("display", "none");
        $(".hideedit").css("display", "block");
        //$("input, select").prop("readonly", false);
        //$("select").prop("disabled", false);
    });

    $(".cancel").click(function () {
        $(".hideedit").css("display", "none");
        $(".showedit").css("display", "block");
        $("input, select").prop("readonly", true);
        $("select").prop("disabled", true);
    });

    $(".done").click(function () {
        var user_id = userID;
        var name = $("#fullname").val();
        var dob = $("#bdate").val();
        var sex = $("#sex").val();
        var hometown = $("#hometown").val();
        var addr = $("#living_place").val();
        var email = $("#email").val();
        var phone_number = $("#phone_number").val();
        var faculty = $("#major").val();
        var enrolled_year = $("#start-year").val();
        var graduate_year = $("#end-year").val();
        var pwd = $("#password").val();

        $.ajax({
            url: "UserInfo/SaveUserInfo",
            async: false,
            type: "post",
            data: {
                "user_id": user_id, "name": name, "dob": dob, "sex": sex,
                "hometown": hometown, "addr": addr, "email": email,
                "phone_number": phone_number, "faculty": faculty,
                "enrolled_year": enrolled_year, "graduate_year": graduate_year,
                "pwd": pwd
            },
            success: function (response) {
                if (response.result == false)
                    alert(response.msg)
            }
        });

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

    $.ajax({
        url: "UserInfo/ShowUserInfo",
        data: { "user_id": userID },
        dataType: "json",
        cache: false,
        async: false,
        success: function (response) {
            $("#fullname").val(response.name);
            $("#mssv").val(response.user_id);
            $("#bdate").val(response.dob);

            $("#sex").value = response.sex;

            $("#hometown").val(response.hometown);
            $("#living_place").val(response.addr);
            $("#email").val(response.email);
            $("#phone_number").val(response.phone_number);
            $("#password").val(response.pwd);
            $("#department").val(response.faculty);
            $("#major").val(response.faculty);
            $("#start-year").val(response.enrolled_year);
            $("#end-year").val(response.graduate_year);

            switch (response.status) {
                case "Actived":
                    $("#state").val("Đang học");
                    break;
                case "Banned":
                    $("#state").val("Bị đình chỉ");
                    break;
            }

            $("#bank").value = response.bank_name;

            $("#bank-number").val(response.transaction_id);
        }
    });
});
