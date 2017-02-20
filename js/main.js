$(document).ready(function() {
	//Scroll to section
	$(".nav-link").on("click", function(e) {
		var section = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(section).offset().top
		}, 500);
	});

	//Cache menu
	var $menu = $(".menu");

	//Hamburger menu toggle
	$(".hamburger").on("click", function() {
		$menu.toggleClass("open");
	});

	//Hide mobile menu after click on linked
	$(".nav-link").on("click", function() {
		if ($(window).width() <= 650) {
			$menu.toggleClass("open");
		}
	});
});
