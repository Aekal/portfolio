$(function() {
	//Cache DOM
	var $menu = $("#menu");
	var $form = $("#form");

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

	//Send contact form with ajax
	$form.on("submit", function(e) {
		e.preventDefault();
		var formData = $(this).serialize();
		$.post("mail.php", formData)
		//Success
		.done(function(data) {
			$form.html("<p class='status success'>" + data + "</p>");
		})
		//Error
		.fail(function() {
			$form.html("<p class='status error'>Wystąpił błąd, odśwież stronę i spróbuj ponownie.</p>");
		});
	});

});
