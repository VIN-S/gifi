<?php 
$dbname = 'gifi';
$dbuser = 'root';
$dbpass = 'password';
$dbhost = '127.0.0.1';
$connect = mysql_connect($dbhost, $dbuser, $dbpass) or die("Unable to Connect to '$dbhost'");
mysql_select_db($dbname) or die("Could not open the db '$dbname'");
?>
