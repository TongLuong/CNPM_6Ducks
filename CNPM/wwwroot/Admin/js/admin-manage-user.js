$(document).ready(function () {
    $("#myDropdown div").click(function () {
        $(".dropdown").has(this).find("span").text($(this).text());
    });

    function show_user_item(stt, name, userID, faculty, status, pageLeft) {
        $(".filter-record").append(
            $("<div></div>").addClass("record stt line-" + stt).text(stt));
        $(".filter-record").append(
            $("<div></div>").addClass("record name line-" + stt).text(name));
        $(".filter-record").append(
            $("<div></div>").addClass("record userID line-" + stt).text(userID));
        $(".filter-record").append(
            $("<div></div>").addClass("record faculty line-" + stt).text(faculty));
        $(".filter-record").append(
            $("<div></div>").addClass("record pageLeft line-" + stt).text(pageLeft));

        var selectElement = $("<select disabled></select>");
        selectElement.addClass("select-status changeStatus line-" + stt);
        selectElement.attr("id", userID);

        selectElement.append(
            $("<option value = Actived>Hoạt động</option>"));
        selectElement.append(
            $("<option value = Banned>Cấm hoạt động</option>"));

        selectElement.val(status);
        $(".filter-record").append(selectElement);
    }

    function display_user() {
        $(".filter-record").html("");
        $.get("AdminManageUser/ShowUser",
            function (response) {
                for (let i = 0; i < response.number; i++) {
                    show_user_item((i + 1).toString(), response.name[i],
                        response.userID[i], response.faculty[i],
                        response.status[i], response.pageLeft[i]);

                    $("#" + response.userID[i]).on("change", function () {
                        var stateSelected = this.value;

                        $.get(
                            "AdminManageUser/ChangeUserState",
                            {
                                "userID": response.userID[i],
                                "newState": stateSelected
                            }
                        )
                    });
                }
            }
        )
    }

    display_user();

    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    function filterUser() {
        var searchInput = removeVietnameseTones(
            $("#search-user").val().toUpperCase());
        /*if (searchInput == "")
            return;*/

        var record = $(".filter-record .line-1");
        var count = 2;
        //record.remove();
        while (record.length > 0) {
            var name = record.eq(1).text();

            if (searchInput == ""
                || removeVietnameseTones(
                    name.toUpperCase()).indexOf(searchInput) > -1) {
                record.each(function () {
                    $(this).css("display", ""); // use default display value
                });
            }
            else {
                record.each(function () {
                    $(this).css("display", "none");
                });
            }

            record = $(".filter-record .line-" + count);
            count++;
        }
        //display_user_from_cache(searchInput);
    }

    $("#search-user").keyup(filterUser);

    $("#confirm-search").click(function () {
        filterUser();
    });

    $("#toggle-edit").click(function () {
        var selectElements = $(".select-status");

        // enable all selects
        selectElements.each(function () {
            $(this).prop("disabled", false);
        });

        document.getElementById("done").style.display = "";
        // hide this button
        this.style.display = "none";
    });

    $("#done").click(function () {
        document.getElementById("toggle-edit").style.display = "";
        this.style.display = "none";

        var selectElements = $(".select-status");

        // enable all selects
        selectElements.each(function () {
            $(this).prop("disabled", true);
        });
    });
});