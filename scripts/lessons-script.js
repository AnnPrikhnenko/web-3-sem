$(function(){
    $("#header").load("header.html", function() {
        $('.header-burger').click(function(event) {
            $('.header-nav').toggleClass('open-burger');
        });
    });
    $("#footer").load("footer.html");
});