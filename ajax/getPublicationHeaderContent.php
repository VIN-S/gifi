<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$header = $_GET['header'];

	$query="SELECT * FROM publicationHeader WHERE update_date = (SELECT MAX(update_date) FROM publicationHeader WHERE headerType = '$header')";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}

?>