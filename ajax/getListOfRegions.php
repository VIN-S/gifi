<?php 
require_once '../includes/db.php'; // The mysql database connection script
 
$query="SELECT DISTINCT region from ranks";
$result = mysql_query($query);

$i=0;

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$year = (string) $row['region'];

	echo json_encode($year);
}
?>