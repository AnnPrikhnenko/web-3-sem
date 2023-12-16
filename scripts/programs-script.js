$(function(){
    $("#header").load("web-3-sem/header.html", function() {
        $('.header-burger').click(function(event) {
            $('.header-nav').toggleClass('open-burger');
        });
    });
    $("#footer").load("../footer.html");
});
