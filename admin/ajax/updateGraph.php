<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_GET['startDate']) and isset($_GET['endDate'])){
	$startDate = $_GET['startDate'];
	$endDate = $_GET['endDate'];

	$query="SELECT dateOfUpdate, viewcount FROM viewCount WHERE dateOfUpdate BETWEEN '$startDate' AND '$endDate'";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		echo json_encode($row, JSON_FORCE_OBJECT);
		echo "//";
	}
}
?>