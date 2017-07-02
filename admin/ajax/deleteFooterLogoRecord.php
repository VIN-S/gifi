<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$name = $_GET['name'];

	$query="DELETE FROM footerLogos WHERE name = '$name';";
	$result = mysqli_query($connect, $query);
?>