<?php

   require_once('mailconfig.php');

   $toAdd = 'mktyler01@gmail.com';
   $fromAdd = $_POST['usremail'];
   $fromName = $_POST['usrname'];
   $subject = 'New message from ' . $fromName . ' - Sent from the Northland Reps website';
   $body = $_POST['message'];

   smtpmailer($toAdd, $fromAdd, $fromName, $subject, $body);

 ?>
