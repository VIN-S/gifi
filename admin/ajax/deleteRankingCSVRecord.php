<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$name = $_GET['name'];
	$year = $_GET['year'];

	$query="DELETE FROM rankingCSV WHERE csvname = '$name';";
	$result = mysqli_query($connect, $query);

	$query="DELETE FROM ranks WHERE year_of_data = '$year';";
	$result = mysqli_query($connect, $query);
?>