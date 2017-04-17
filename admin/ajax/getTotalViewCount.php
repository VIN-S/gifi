<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$query="SELECT SUM(viewcount) AS totalview FROM viewCount";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		echo json_encode($row, JSON_FORCE_OBJECT);
	}

?>