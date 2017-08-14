<?php

   require_once('mailconfig.php');

   if (!isset($_POST["hp"]) || $_POST["hp"] != "check" || "POST" != getenv("REQUEST_METHOD")) {
    header("Location: ../"); exit;
   }
   if (!empty($_POST["email"])) {
       header("Location: ../"); exit;
   }
   if ("" == getenv("HTTP_USER_AGENT") || "" == getenv("HTTP_REFERER")) {
       header("Location: ../"); exit;
   }

   $toAdd = 'mktyler01@gmail.com';
   $fromAdd = $_POST['usremail'];
   $fromName = $_POST['usrname'];
   $subject = 'New message from ' . $fromName . ' ' . $fromAdd . ' - Sent from the Northland Reps website';
   $body = $_POST['message'];

   smtpmailer($toAdd, $fromAdd, $fromName, $subject, $body);

 ?>
