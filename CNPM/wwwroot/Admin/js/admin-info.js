$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var adminID = urlParams.get('id');

    $(".hideedit").css("display", "none"); // Initially set the 'hideedit' section to display: none
    $("input, select").prop("readonly", true);
    $("select").prop("disabled", true);

    $(".edit").click(function () {
        $(".showedit").css("display", "none");
        $(".hideedit").css("display", "block");
        $("select").prop("disabled", false);
        $("#fullname, #bdate, #phone_number, #password, #sex, #hometown, #living_place").prop("readonly", false);
    });

    $(".cancel").click(function () {
        $(".hideedit").css("display", "none");
        $(".showedit").css("display", "block");
        $("select").prop("disabled", true);
        $("#fullname, #bdate, #phone_number, #password, #sex, #hometown, #living_place").prop("readonly", true);
        getInfo();
    });

    $("#btn-done").click(function () {
        $(".modal").css("display", "none");
        $(".hideedit").css("display", "none");
        $(".showedit").css("display", "block");
        $("select").prop("disabled", true);
        $("#fullname, #bdate, #phone_number, #password, #sex, #hometown, #living_place").prop("readonly", true);
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
        url: "AdminInfo/LoadAdminInfo",
        data: { "adminID": adminID },
        dataType: "json",
        cache: false,
        async: false,
        success: function (response) {
            $("#fullname").val(response.name);
            $("#mscb").val(response.admin_id);
            $("#bdate").val(response.bdate);

            $("#sex").value = response.sex;

            $("#hometown").val(response.hometown);
            $("#living_place").val(response.addr);
            $("#email").val(response.email);
            $("#phone_number").val(response.phone_number);
            $("#password").val(response.pwd);
        }
    });

    $("#done").click(function () {
        var name = $("#fullname").val();

        var bdate = $("#bdate").val();
        var sex = $("#sex").val();
        var hometown = $("#hometown").val();
        var addr = $("#living_place").val();

        var email = $("#email").val();
        var phone_number = $("#phone_number").val();
        var pwd = $("#password").val();

        $.ajax({
            url: "AdminInfo/SaveAdminInfo",
            async: false,
            type: "post",
            data: {
                "admin_id": adminID, "name": name, "bdate": bdate, "sex": sex,
                "hometown": hometown, "addr": addr, "email": email,
                "phone_number": phone_number, "pwd": pwd
            },
            success: function (response) {
                if (response.result == false)
                    alert(response.msg)
            }
        });

        $(".modal").css("display", "block");
    });
});