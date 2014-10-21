<?php
	//print_r($_POST);
	
	error_reporting(0);

	$mail_to = 'qwerty@gmail.com'; 
	$type = 'plain'; 
	$charset = 'UTF-8';
	$mail_from = '_';

	include('smtp-func.php');

	$name = mb_substr(htmlspecialchars(trim($_POST['name'])), 0, 1000, 'UTF-8');
	$phone = mb_substr(htmlspecialchars(trim($_POST['phone'])), 0, 1000, 'UTF-8');	
	$comment = mb_substr(htmlspecialchars(trim($_POST['comment'])), 0, 1000, 'UTF-8');	

	$replyto = 'no_reply@qwerty.ru';
	$headers =  "To: \"Administrator\" <$mail_to>\r\n".
			  "From: \"$replyto\" <$mail_from>\r\n".
			  "Reply-To: $replyto\r\n".
			  "Content-Type: text/$type; charset=\"$charset\"\r\n";
	$sended = smtpmail($mail_to, $name, "Заявка с сайта qwerty.ru от " . $name . ". \r\nДанные для связи: " . $phone . ". \r\nКомментарий: " . $comment, $headers);

	if($sended){
		$response = 'success'; 
	}
	else{
		$response = 'error';
	}	

	print(json_encode($response)); 
?>
