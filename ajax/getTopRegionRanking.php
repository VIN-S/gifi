<?php 
require_once '../includes/db.php'; // The mysql database connection script

	$query="SELECT * FROM ranks WHERE investor_friendliness_rank = 1";
	$result = mysql_query($query);

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}

?>