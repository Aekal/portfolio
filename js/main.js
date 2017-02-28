$(document).ready(function() {
	//Scroll on nav links click
	$(".nav-link").on("click", function(e) {
		var section = $(this).attr("href");
		e.preventDefault();
		scrollToSection(section);
	});

	//Scroll on arrow click
	$(".scroll-arrow").on("click", function() {
		scrollToSection("#o-mnie");
	});

	function scrollToSection(section) {
		$("html, body").animate({
			scrollTop: $(section).offset().top
		}, 500);
	}

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
