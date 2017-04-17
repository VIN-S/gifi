<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_GET['today'])){
	$today = $_GET['today'];

	$query="SELECT * FROM downloadCount WHERE dateOfUpdate = '$today'";
	$result = mysqli_query($connect, $query);

	while ($row = mysqli_fetch_array($result)) {
		echo json_encode($row, JSON_FORCE_OBJECT);
	}
}
?>