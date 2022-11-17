$("#articles").on("click", "#load-more", function(e) {
	e.preventDefault();
	var $button = $(this);
	var next_page = $button.attr("href");
	$button.html("<img src='https://f.hubspotusercontent20.net/hubfs/20705724/loading-buffering.gif' width='100'>");
	$("#articles").append(
		$("<div />").load(next_page + " #articles", function() {
			$button.remove();
		})
	);
});