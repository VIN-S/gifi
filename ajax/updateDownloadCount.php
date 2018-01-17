<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['today'])){
	$today = $_GET['today'];

	$query = mysqli_prepare($connect, "INSERT INTO downloadCount SET dateOfUpdate = ?, downloadcount = 1 ON DUPLICATE KEY UPDATE downloadcount = downloadcount+1");
	mysqli_stmt_bind_param($query, "s", $today);
	mysqli_stmt_execute($query);
	$result = mysqli_stmt_get_result($query);
}
?>