$(document).ready(function() {
	//Scroll to section
	$(".nav-link").on("click", function() {
		var section = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(section).offset().top
		}, 500);
	});
});
