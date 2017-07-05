<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_GET['factor'])){
	$factor = $_GET['factor'];
	$date = $_GET['date'];
	$component = $_GET['component'];

	$query="INSERT INTO componentFactor(update_date, component, factor) VALUES('$date', '$component', '$factor');";
	$result = mysqli_query($connect, $query);
}
?>