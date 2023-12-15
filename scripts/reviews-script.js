$(function(){
    $("#header").load("../header.html", function() {
        $('.header-burger').click(function(event) {
            $('.header-nav').toggleClass('open-burger');
        });
    });
    $("#footer").load("../footer.html");
});

// Initializing a class Swiper:
// '.swiper' - name of the default library class
// You can make a more detailed setting in square brackets {} after '.swiper'
new Swiper('.swiper', {
    // Optional parameter loop:
    // the last image/text switches to the first one
    loop: true,

    // Optional parameter pagination:
    // there will be dots under the images/texts
    // that will be highlighted in a different color
    // when viewing a current image/text
    pagination: {
        el: '.swiper-pagination',
    },

    // Optional parameter navigation:
    // add arrows to switch images/texts
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
