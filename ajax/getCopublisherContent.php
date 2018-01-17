<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$copublisher = $_GET['copublisher'];

	$query = mysqli_prepare($connect, "SELECT * FROM copublisherIntroduction WHERE update_date = (SELECT MAX(update_date) FROM copublisherIntroduction WHERE copublisher = ?)");
	mysqli_stmt_bind_param($query, "s", $copublisher);
	mysqli_stmt_execute($query);
	$result = mysqli_stmt_get_result($query);

	while ($row = mysqli_fetch_assoc($result)) {
		$data = $row;
		echo $data['introduction'];
	}

?>