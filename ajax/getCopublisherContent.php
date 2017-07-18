<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$copublisher = $_GET['copublisher'];

	$query="SELECT * FROM copublisherIntroduction WHERE update_date = (SELECT MAX(update_date) FROM copublisherIntroduction WHERE copublisher = '$copublisher')";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;
		echo $data['introduction'];
	}

?>