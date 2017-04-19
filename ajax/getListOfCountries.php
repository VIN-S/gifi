<?php 
require_once '../includes/db.php'; // The mysql database connection script
 
if(isset($_GET['year'])){ 
	$year = $_GET['year'];

	$query="SELECT country from ranks WHERE year_of_data='$year'";
	$result = mysqli_query($connect, $query);

	$i=0;

	while ($row = mysqli_fetch_array($result)) {
		$country = (string) $row['country'];

		echo json_encode($country);
	}
}
?>