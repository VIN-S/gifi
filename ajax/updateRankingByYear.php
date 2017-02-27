<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['year'])){
	$year = $_GET['year'];
	$query="SELECT * FROM ranks WHERE year_of_data = '$year' AND investor_friendliness_rank != 0 ORDER BY investor_friendliness_rank ASC";
	$result = mysql_query($query);

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		$data = $row;

		echo json_encode($data, JSON_FORCE_OBJECT);
		echo "//";
	}
}
?>