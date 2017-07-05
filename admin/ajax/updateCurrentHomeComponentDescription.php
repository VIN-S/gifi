<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_GET['description'])){
	$description = $_GET['description'];
	$component = $_GET['component'];

	$query="INSERT INTO componentDescription(component, description) VALUES('$component', '$description');";
	$result = mysqli_query($connect, $query);
}
?>