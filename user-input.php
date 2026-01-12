<?php
$email = $_POST['email'];
$comment = $_POST['comment'];

$entry = "Email: $email\nComment: $comment\n----------------------\n";

file_put_contents("comments.txt", $entry, FILE_APPEND);

echo "Thank you! Your feedback has been received.";
?>