<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['today'])){
	$today = $_GET['today'];

	$query="INSERT INTO downloadCount SET dateOfUpdate = '$today', downloadcount = 1 ON DUPLICATE KEY UPDATE downloadcount = downloadcount+1";
	$result = mysqli_query($connect, $query);
}
?>