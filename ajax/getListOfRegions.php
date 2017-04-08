<?php 
require_once '../includes/db.php'; // The mysql database connection script
 
$query="SELECT DISTINCT region from ranks";
$result = mysqli_query($connect, $query);

$i=0;

while ($row = mysqli_fetch_array($result)) {
	$year = (string) $row['region'];

	echo json_encode($year);
}
?>