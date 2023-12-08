$(document).ready(function () {
  $("#myDropdown div").click(function() {
    $(".dropdown").has(this).find("span").text($(this).text());
  });

    alert("Hieuga");

    function show_user_item(stt, name, userID, faculty, pageLeft) {
        $(".filter-record").append($("<div></div>").addClass("record").text(stt));
        $(".filter-record").append($("<div></div>").addClass("record").text(name));
        $(".filter-record").append($("<div></div>").addClass("record").text(userID));
        $(".filter-record").append($("<div></div>").addClass("record").text(faculty));
        $(".filter-record").append($("<div></div>").addClass("record").text(pageLeft));


        alert("hakf");
        // $.get("components/user_admin.html", function (data) {
        //     $(".filter-record").append(data);
        //     var item = $(".filter-record .user-item:last-child()");
        //     item.find("#stt").text(stt);
        //     item.find("#name").text(name);
        //     item.find("#user-id").text(userID);
        //     item.find("#faculty").text(faculty);
        //     item.find("#page-left").text(pageLeft);
        // }
        // );
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

    display_user();
});