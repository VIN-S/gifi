<?php 
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['userid'])){
$userid = $_GET['userid'];
$pwd = $_GET['pwd'];
 
$query="SELECT * FROM admin WHERE username='$userid' AND password ='$pwd'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
if ($result->num_rows > 0){
	echo "success";
}
else
	echo "fail";
}
?>