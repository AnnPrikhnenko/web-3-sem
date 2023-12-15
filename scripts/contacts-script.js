$(function(){
    $("#header").load("../header.html", function() {
        $('.header-burger').click(function(event) {
            $('.header-nav').toggleClass('open-burger');
        });
    });
    $("#footer").load("../footer.html");
});

let start, end;
window.addEventListener('DOMContentLoaded', () => {
    start = new Date().getTime();
});
window.addEventListener('load', () => {
    end = new Date().getTime();
    printTime();
});
function printTime() {
    let time = (end - start) / 1000
    document.getElementById( "time").innerText = "Page load time is " + time.toString() + " seconds"
}