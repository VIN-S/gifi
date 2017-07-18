<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$position = $_GET['position'];

	$query="SELECT * FROM backgroundText WHERE update_date = (SELECT MAX(update_date) FROM backgroundText WHERE position = '$position')";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;
		echo $data['content'];
	}

?>