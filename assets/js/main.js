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

	function validateForm() {
		var $textField = $form.find("input[type=text]");
		var $emailField = $form.find("input[type=email]");
		var $messageField = $form.find("textarea");
		var fieldsReady = 0;
		var check = {};

		function showError($field, show) {
			if (show === false) {
				$field.removeClass("error").addClass("success");
			} else {
				$field.removeClass("success").addClass("error");
			}
		}

		function checkName() {
			var name = $textField.val().trim();
			if (name.length >= 3) {
				showError($textField, false);
				check.name = true;
				return true;
			} else {
				check.name = false;
				showError($textField);
			}
		}

		function checkEmail() {
			var email = $emailField.val().trim();
			var mailReg = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,6}$/;
			if (mailReg.test(email)) {
				showError($emailField, false);
				check.email = true;
				return true;
			} else {
				check.email = false;
				showError($emailField);
			}
		}

		function checkMessage() {
			var message = $messageField.val().trim();
			if (message.length >= 5) {
				showError($messageField, false);
				check.message = true;
				return true;
			} else {
				check.message = false;
				showError($messageField);
			}
		}

		//Test every input
		checkName();
		checkEmail();
		checkMessage();
		//Count correct inputs
		for (var val in check) {
			if (check[val] === true) {
				fieldsReady++;
			}
		}
		//Compare correct count with inputs count
		if (fieldsReady === $form.find(".field").length) {
			return true;
		}
	}

	//Send contact form with ajax
	$form.on("submit", function(e) {
		e.preventDefault();
		// Send form after validation
		if (validateForm()) {
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
		}
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
