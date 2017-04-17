<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script
if(isset($_GET['username'])){
$username = $_GET['username'];
$pwd = $_GET['pwd'];

$query = "SELECT * from admin WHERE username='$username' AND password='$pwd'";
$result = mysqli_query($connect, $query);

$tblCnt=0;

while ($row = mysqli_fetch_array($result)) {
    $tblCnt++;
}

$response=array();

if ($tblCnt>0) {
	$response['status'] = 'success';
	$response['message'] = 'Log in successful!';
	$response['userName'] = $username;

	echo json_encode($response);
} else {
  	$response['status'] = 'error';
	$response['message'] = 'Log in fail!';

	echo json_encode($response);
}
}
?>