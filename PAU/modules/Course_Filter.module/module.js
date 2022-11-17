
$('.ui-group h3').click(function(e){
    e.stopPropagation();
    $(this).parent().siblings().children('h3').next().slideUp();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().toggleClass('active')
    $(this).next().slideToggle();
})





