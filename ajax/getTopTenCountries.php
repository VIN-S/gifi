<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['year'])){
	$year = $_GET['year'];
	$query="SELECT country FROM ranks WHERE investor_friendliness_rank != 0 AND investor_friendliness_rank > 0 AND investor_friendliness_rank < 11 AND year_of_data = '$year' ORDER BY investor_friendliness_rank ASC";
	$result = mysql_query($query);

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		$country = (string) $row['country'];

		echo json_encode($country);
	}
}
?>