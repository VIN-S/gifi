<?php 
require_once '../includes/db.php'; // The mysql database connection script
 
$query="SELECT DISTINCT year_of_data from ranks ORDER BY year_of_data ASC";
$result = mysqli_query($connect, $query);

$i=0;

while ($row = mysqli_fetch_assoc($result)) {
	$year = (string) $row['year_of_data'];

	echo json_encode($year);
}
?>