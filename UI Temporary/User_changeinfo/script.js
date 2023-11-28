$("document").ready(function() {
    $.get("../modules/header.html", function(data) {
        $("body").append(data);
    });
    $.get("../modules/footer.html", function(data) {
        $("body").prepend(data);
    });
})