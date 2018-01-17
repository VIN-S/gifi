<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['year'])){
	$year = $_GET['year'];
	$query = mysqli_prepare($connect, "SELECT country FROM ranks WHERE investor_friendliness_rank != 0 AND investor_friendliness_rank > 0 AND investor_friendliness_rank < 11 AND year_of_data = ? ORDER BY investor_friendliness_rank ASC");
	mysqli_stmt_bind_param($query, "i", $year);
	mysqli_stmt_execute($query);
	$result = mysqli_stmt_get_result($query);

	while ($row = mysqli_fetch_assoc($result)) {
		$country = (string) $row['country'];

		echo json_encode($country);
	}
}
?>