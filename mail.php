<?php
header('Content-Type: text/html; charset=utf-8');

if (isset($_POST['submit'])) {

	$to = "damian.fialkiewicz@gmail.com";
	$subject = "Portfolio | Kontakt";
	$name = $_POST['name'];
	$email = $_POST['email'];
	$content = $_POST['message'];
	$message = "Od: $name \n".
					"Email: $email \n".
					"Wiadomość: \n\n"."\"$content\"";

	if (mail($to, $subject, $message)) {
		echo '<p>Twoja wiadomość została wysłana!</p>';
		echo '<a href="/">Wróć do strony głownej</a>';
	} else {
		echo '<p>Coś poszło nie tak, cofnij i spróbuj ponownie!</p>';
		echo '<a href="/">Wróć do strony głownej</a>';
	};
}
?>
