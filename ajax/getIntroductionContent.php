<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$query="SELECT content FROM introductionContent WHERE dateOfUpdate = (SELECT MAX(dateOfUpdate) FROM introductionContent)";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_assoc($result)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}

?>