<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$query="SELECT MAX(year_of_data) AS latestYear FROM ranks";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_assoc($result)) {
		echo json_encode($row, JSON_FORCE_OBJECT);
	}
?>