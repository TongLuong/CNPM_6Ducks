$(document).ready(function () {
  $("#myDropdown div").click(function() {
    $(".dropdown").has(this).find("span").text($(this).text());
  });

    function show_user_item(stt, name, userID, faculty, pageLeft) {
        $(".filter-record").append($("<div></div>").addClass("record").text(stt));
        $(".filter-record").append($("<div></div>").addClass("record").text(name));
        $(".filter-record").append($("<div></div>").addClass("record").text(userID));
        $(".filter-record").append($("<div></div>").addClass("record").text(faculty));
        $(".filter-record").append($("<div></div>").addClass("record").text(pageLeft));
    }

    function display_user() {
        $.get("AdminManageUser/ShowUser",
            function (response) {
                for (let i = 0; i < response.number; i++) {
                    show_user_item(i.toString(), response.name[i], response.userID[i], response.faculty[i], response.pageLeft[i]);
                }
            }
        )
    }

    $("#confirm-search").click(function() {
        display_user();
    });
});