<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$type = $_GET['type'];
	$year = $_GET['year'];
	$name = $_GET['name'];

	$query="REPLACE INTO inauguralPDF(name, yearOfDocument, documentType) VALUES('$name', '$year', '$type');";
	$result = mysqli_query($connect, $query);
?>