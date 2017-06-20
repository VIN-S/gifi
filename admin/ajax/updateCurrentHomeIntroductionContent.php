<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_GET['content'])){
	$content = $_GET['content'];
	$today = date("Y-m-d h:i:sa");

	$query="INSERT INTO introductionContent VALUES('$today', '$content');";
	$result = mysqli_query($connect, $query);
}
?>