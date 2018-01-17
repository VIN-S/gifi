<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$component = $_GET['component'];

	$query = mysqli_prepare($connect, "SELECT * FROM componentDescription, componentFactor WHERE componentDescription.update_date = (SELECT MAX(update_date) FROM componentDescription WHERE component = ?) AND componentFactor.update_date = (SELECT MAX(update_date) FROM componentFactor WHERE component = ?)");
	mysqli_stmt_bind_param($query, "ss", $component, $component);
	mysqli_stmt_execute($query);
	$result = mysqli_stmt_get_result($query);

	while ($row = mysqli_fetch_assoc($result)) {
		$data = $row;

		echo json_encode($data, JSON_FORCE_OBJECT);
		echo "//";
	}

?>