<?php
header('Content-Type: text/html; charset=utf-8');

	$to = "damian.fialkiewicz@gmail.com";
	$subject = "Portfolio | Kontakt";
	$name = $_POST['name'];
	$email = $_POST['email'];
	$content = $_POST['message'];
	$message = "Od: $name \n".
					"Email: $email \n".
					"Wiadomość: \n\n"."\"$content\"";

	if (empty($name) || empty($email) || empty($content)) {
		http_response_code(400);
		exit;
	}

	if (mail($to, $subject, $message)) {
		echo 'Twoja wiadomość została wysłana!';
	}
?>
