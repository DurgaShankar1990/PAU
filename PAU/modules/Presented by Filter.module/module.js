$(document).ready(function(){
    $('.courseData').each(function(){
        var $button = $(this);
        var next_page = $button.attr("href");
        
        $("#Courses").append(
        $("<div class='flex-row flex-wrap grid ' />").load(next_page + "#Courses .citem", function() {
            })
            
        );
    });
});

