<?php 
require_once '../includes/db.php'; // The mysql database connection script
 
$query="SELECT country from ranks";
$result = mysqli_query($connect, $query);

$i=0;

while ($row = mysqli_fetch_array($result)) {
	$country = (string) $row['country'];

	echo json_encode($country);
}
?>