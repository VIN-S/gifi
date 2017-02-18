<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script
if(isset($_GET['username'])){
$username = $_GET['username'];
$pwd = $_GET['pwd'];

$query = "SELECT * from admin WHERE username='$username' AND password='$pwd'";
$result = mysql_query($query);

$tblCnt=0;

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $tblCnt++;
}

$response=array();

if ($tblCnt>0) {
	$response['status'] = 'success';
	$response['message'] = 'Log in successful!';

	echo json_encode($response);
} else {
  	$response['status'] = 'error';
	$response['message'] = 'Log in fail!';

	echo json_encode($response);
}
}
?>