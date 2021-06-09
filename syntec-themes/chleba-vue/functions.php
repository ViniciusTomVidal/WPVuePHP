<?php

define('WP_HOME','http://' . $_SERVER["HTTP_HOST"]);
define('WP_SITEURL','http://' . $_SERVER["HTTP_HOST"]);
include 'includes/class/VueChleba.php';
include('phpmailer/class.phpmailer.php');
$VueChleba =  new VueChleba();

?>