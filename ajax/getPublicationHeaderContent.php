<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$header = $_GET['header'];

	$query = mysqli_prepare($connect, "SELECT * FROM publicationHeader WHERE update_date = (SELECT MAX(update_date) FROM publicationHeader WHERE headerType = ?)");
	mysqli_stmt_bind_param($query, "s", $header);
	mysqli_stmt_execute($query);
	$result = mysqli_stmt_get_result($query);

	while ($row = mysqli_fetch_assoc($result)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}

?>