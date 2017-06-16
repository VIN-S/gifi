<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_GET['content'])){
	$content = $_GET['content'];
	$today = date("Y-m-d");

	$query="UPDATE introductionContent SET content = '$content', dateOfUpdate = '$today'";
	$result = mysqli_query($connect, $query);
}
?>