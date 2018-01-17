<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$query="SELECT * FROM inauguralPDF WHERE documentType = 'Full Report' ORDER BY yearOfDocument DESC";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_assoc($result)) {
		$data = $row;

		echo json_encode($data, JSON_FORCE_OBJECT);
		echo "//";
	}

?>