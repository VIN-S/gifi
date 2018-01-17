<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$position = $_GET['position'];

	$query = mysqli_prepare($connect, "SELECT * FROM backgroundText WHERE update_date = (SELECT MAX(update_date) FROM backgroundText WHERE position = ?)");
	mysqli_stmt_bind_param($query, "s", $position);
	mysqli_stmt_execute($query);
	$result = mysqli_stmt_get_result($query);

	while ($row = mysqli_fetch_assoc($result)) {
		$data = $row;
		echo $data['content'];
	}

?>