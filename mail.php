<?php
header('Content-Type: text/html; charset=utf-8');

$to = "damian.fialkiewicz@gmail.com";
$subject = "Portfolio | Kontakt";
$name = $_POST('name');
$email = $_POST('email');
$content = $_POST('message');
$message = "Od: $name \n".
				"email: $email \n".
				"Wiadomość: \n\n"."$message";

mail($to, $subject, $message);
?>
