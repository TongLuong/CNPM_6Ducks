$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var adminID = urlParams.get('id');
    
    $(".edit-info, .avatar").click(function (e) {
        e.preventDefault();
        location.href = "AdminInfo" + "?id=" + adminID;
    });
    $(".manage-user").click(function (e) {
        e.preventDefault();
        location.href = "AdminManageUser" + "?id=" + adminID;
    });
    $(".manage-printer").click(function (e) {
        e.preventDefault();
        location.href = "AdminManagePrinter" + "?id=" + adminID;
    });
    $(".manage-system").click(function (e) {
        e.preventDefault();
        location.href = "AdminManageSystem" + "?id=" + adminID;
    });
    $(".notification").click(function (e) {
        e.preventDefault();
        location.href = "AdminNotification" + "?id=" + adminID;
    });
});