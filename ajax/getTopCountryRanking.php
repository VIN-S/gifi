<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['year'])){
	$year = $_GET['year'];

	$query = mysqli_prepare($connect, "SELECT * FROM ranks WHERE investor_friendliness_rank = 1 AND year_of_data = ?");
	mysqli_stmt_bind_param($query, "i", $year);
	mysqli_stmt_execute($query);
	$result = mysqli_stmt_get_result($query);

	while ($row = mysqli_fetch_assoc($result)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}
}
?>