<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$component = $_GET['component'];

	$query="SELECT * FROM componentDescription WHERE update_date = (SELECT MAX(update_date) FROM componentDescription WHERE component = '$component')";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}

?>