<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$query="SELECT MAX(year_of_data) AS latestYear FROM ranks";
	$result = mysql_query($query);

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo json_encode($row, JSON_FORCE_OBJECT);
	}
?>