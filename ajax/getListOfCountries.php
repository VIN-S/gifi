<?php 
require_once '../includes/db.php'; // The mysql database connection script
 
$query="SELECT country from ranks";
$result = mysql_query($query);

$i=0;

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$country = (string) $row['country'];

	echo json_encode($country);
}
?>