<?php 
$dbname = 'gifi';
$dbuser = 'root';
$dbpass = 'password';
$dbhost = '127.0.0.1';
$connect = mysqli_connect($dbhost, $dbuser, $dbpass) or die("Unable to Connect to '$dbhost'");
mysqli_select_db($connect,$dbname) or die("Could not open the db '$dbname'");
?>
