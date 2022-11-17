// $('.ui-group h3').click(function(e){
//     e.stopPropagation();
//     $(this).parent().siblings().children('h3').next().slideUp();
//     $(this).parent().siblings().removeClass('active');
//     $(this).parent().toggleClass('active')
//     $(this).next().slideToggle();
// })

$("#articles").on("click", "#load-more", function(e) {
	e.preventDefault();
	var $button = $(this);
	var next_page = $button.attr("href");
	$button.text("... loading ...");
	$("#articles").append(
		$("<div />").load(next_page + " #articles", function() {
			$button.remove();
		})
	);
});