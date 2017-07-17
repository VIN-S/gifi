<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$position = $_GET['position'];
	$content = $_GET['content'];

	$query="INSERT INTO backgroundText(position, content) VALUES('$position', '$content');";
	$result = mysqli_query($connect, $query);

?>