<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['year']) and isset($_GET['region'])){
	$year = $_GET['year'];
	$region = $_GET['region'];
	if($region == 'All'){
		$query="SELECT * FROM ranks WHERE year_of_data = '$year' AND investor_friendliness_rank != 0 ORDER BY investor_friendliness_rank ASC";
		$result = mysqli_query($connect, $query);

		while ($row = mysqli_fetch_array($result)) {
			$data = $row;

			echo json_encode($data, JSON_FORCE_OBJECT);
			echo "//";
		}
	}else{
		$query="SELECT * FROM ranks WHERE year_of_data = '$year' AND investor_friendliness_rank != 0 AND region='$region' ORDER BY investor_friendliness_rank ASC";
		$result = mysqli_query($connect, $query);

		while ($row = mysqli_fetch_array($result)) {
			$data = $row;

			echo json_encode($data, JSON_FORCE_OBJECT);
			echo "//";
		}
	}
}
?>