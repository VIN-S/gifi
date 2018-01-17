<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['year']) and isset($_GET['region'])){
	$year = $_GET['year'];
	$region = $_GET['region'];
	if($region == 'All'){
		$query = mysqli_prepare($connect, "SELECT * FROM ranks WHERE year_of_data = ? AND investor_friendliness_rank != 0 ORDER BY investor_friendliness_rank ASC");
		mysqli_stmt_bind_param($query, "i", $year);
		mysqli_stmt_execute($query);
		$result = mysqli_stmt_get_result($query);

		while ($row = mysqli_fetch_assoc($result)) {
			$data = $row;

			echo json_encode($data, JSON_FORCE_OBJECT);
			echo "//";
		}
	}else{
		$query = mysqli_prepare($connect, "SELECT * FROM ranks WHERE year_of_data = ? AND investor_friendliness_rank != 0 AND region=? ORDER BY investor_friendliness_rank ASC");
		mysqli_stmt_bind_param($query, "is", $year, $region);
		mysqli_stmt_execute($query);
		$result = mysqli_stmt_get_result($query);
		
		while ($row = mysqli_fetch_assoc($result)) {
			$data = $row;

			echo json_encode($data, JSON_FORCE_OBJECT);
			echo "//";
		}
	}
}
?>