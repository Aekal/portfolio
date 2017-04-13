$(function() {
	//Cache DOM
	var $menu = $("#menu");
	var $form = $("#form");
	var $navLink = $(".nav-link");

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
		scrollToSection("#about");
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

	//Waypoints for highlight active link & fade in sections
		$navLink.each(function() {
			var $link = $(this);
			var sectionName = $link.attr("href");
			var $section = $(sectionName);
			//Fade in animation
			$section.waypoint(function(direction) {
				if (direction === "down") {
					if (sectionName != "#start") {
						$section.find(".section-container").addClass("animated");
					} else {
						$section.find("h1").addClass("animated");
					}
				}
			},
			{
				offset: '85%'
			});
			//Highlight active link
			$section.waypoint(function(direction) {
				if (direction === "down") {
					$navLink.removeClass("active");
					$link.addClass("active");
				}
			},
			{
				offset: '40%'
			});
			$section.waypoint(function(direction) {
				if (direction === "up") {
					$navLink.removeClass("active");
					$link.addClass("active");
				}
			},
			{
				offset: '-40%'
			});
		});
});
