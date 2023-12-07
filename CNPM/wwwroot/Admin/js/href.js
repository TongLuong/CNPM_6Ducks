$(document).ready(function () {
  $(".edit-info, .avatar").click(function (e) { 
    e.preventDefault();
    location.href = "AdminInfo";
  });
  $(".manage-user").click(function (e) { 
    e.preventDefault();
    location.href = "AdminManageUser";
  });
  $(".manage-printer").click(function (e) { 
    e.preventDefault();
    location.href = "AdminManagePrinter";
  });
  $(".manage-system").click(function (e) { 
    e.preventDefault();
    location.href = "AdminManageSystem";
  });
  $(".notification").click(function (e) { 
    e.preventDefault();
    location.href = "AdminNotification";
  });
});