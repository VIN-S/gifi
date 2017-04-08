<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['country']) and isset($_GET['year'])){
	$year = $_GET['year'];
	$selectedCountry = (string)$_GET['country'];
	$query="SELECT * FROM ranks WHERE country = '$selectedCountry' AND year_of_data = '$year'";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}
}
?>