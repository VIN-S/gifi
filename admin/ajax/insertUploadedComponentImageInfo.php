<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$name = $_GET['name'];
	$component = $_GET['component'];

	$query="
	REPLACE INTO componentImages(name, component) VALUES('$name', '$component');";
	$result = mysqli_query($connect, $query);
?>