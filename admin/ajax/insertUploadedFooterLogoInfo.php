<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$name = $_GET['name'];
	$type = $_GET['type'];

	$query="
	REPLACE INTO footerLogos(name, type) VALUES('$name', '$type');";
	$result = mysqli_query($connect, $query);
?>