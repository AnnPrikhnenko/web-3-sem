$(function(){
    $('.header-nav a').each(function(){
        if(document.location.href == this.href){
            $(this).addClass('header-nav__item__active');
        }
    });
});

