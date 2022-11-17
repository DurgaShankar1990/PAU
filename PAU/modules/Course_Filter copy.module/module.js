
$('.ui-group h3').click(function(e){
    e.stopPropagation();
    $(this).parent().siblings().children('h3').next().slideUp();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().toggleClass('active')
    $(this).next().slideToggle();
})



// $('.insPage').each(function(i){
//     var $button = $(this);
//     var next_page = $button.attr("href");      
//     var $items = $("<div id=load>").load(next_page + " #load .element-item", function() {
//         $('.insPageData').append( $items );
//         console.log(count);
    
//     });
//     console.log("hi")
// })




