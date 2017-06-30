<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

	$query="SELECT * FROM inanguralPDF ORDER BY upload_date DESC";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;

		echo json_encode($data, JSON_FORCE_OBJECT);
		echo "//";
	}

?>