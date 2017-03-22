$(function() {
	//Cache DOM
	var $menu = $("#menu");

	$("#menu-list").on("click", "a", function(e) {
		//Scroll to section
		var section = $(this).attr("href");
		e.preventDefault();
		scrollToSection(section);
		//Hide mobile menu
		if ($(window).width() <= 650) {
			$menu.toggleClass("open");
		}
	});

	$("#scroll-arrow").on("click", function() {
		scrollToSection("#o-mnie");
	});

	$("#hamburger").on("click", function() {
		$menu.toggleClass("open");
	});

	function scrollToSection(section) {
		$("html, body").animate({
			scrollTop: $(section).offset().top
		}, 500);
	}
});
