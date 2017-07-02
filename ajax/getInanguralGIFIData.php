<?php 
require_once '../includes/db.php'; // The mysql database connection script


	$query="SELECT * FROM inanguralPDF WHERE yearOfDocument = (SELECT MAX(yearOfDocument) FROM inanguralPDF)";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;

		echo json_encode($data, JSON_FORCE_OBJECT);
		echo "//";
	}

?>