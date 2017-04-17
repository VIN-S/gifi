<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['today'])){
	$today = $_GET['today'];

	$query="INSERT INTO viewCount SET dateOfUpdate = '$today', viewcount = 1 ON DUPLICATE KEY UPDATE viewcount = viewcount+1";
	$result = mysqli_query($connect, $query);
}
?>