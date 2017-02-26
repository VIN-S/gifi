<?php 
require_once '../includes/db.php'; // The mysql database connection script
 
$query="SELECT DISTINCT year_of_data from ranks";
$result = mysql_query($query);

$i=0;

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$year = (string) $row['year_of_data'];

	echo json_encode($year);
}
?>