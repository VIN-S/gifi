<?php 
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['country'])){
	$selectedCountry = (string)$_GET['country'];
	$query="SELECT * FROM ranks WHERE country = '$selectedCountry'";
	$result = mysql_query($query);

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		$data = $row;
		echo json_encode($data, JSON_FORCE_OBJECT);
	}
}
?>