<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$copublisher = $_GET['copublisher'];
	$content = $_GET['content'];

	$query="INSERT INTO copublisherIntroduction(copublisher, introduction) VALUES('$copublisher', '$content');";
	$result = mysqli_query($connect, $query);

?>