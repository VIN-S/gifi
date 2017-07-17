<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$header = $_GET['header'];
	$headerContent = $_GET['headerContent'];
	$newHeaderDescription = $_GET['newHeaderDescription'];

	$query="INSERT INTO publicationHeader(headerType, headerContent, headerDescription) VALUES('$header', '$headerContent', '$newHeaderDescription');";
	$result = mysqli_query($connect, $query);

?>