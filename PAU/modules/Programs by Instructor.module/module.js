$(".totalPages").each(function(e) {
	var $button = $(this);
	var next_page = $button.attr("href");
	$("#Presenters").append(
		$("<div />").load(next_page + " #Presenters ", function() {
			$button.remove();
		})
	);
});