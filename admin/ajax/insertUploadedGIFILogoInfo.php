<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$name = $_GET['name'];

	$query="
	REPLACE INTO GIFILogo(name) VALUES('$name');";
	$result = mysqli_query($connect, $query);
?>