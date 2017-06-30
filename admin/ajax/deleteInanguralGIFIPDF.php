<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script
	
	$name = $_GET['name'];

    //The error validation could be done on the javascript client side.
    $errors= array();        
    $file_name = $name;

    $target_dir = dirname(__FILE__)."/uploaded_pdf/";
    $target_file = $target_dir . $file_name;
         

    unlink($target_file);
    echo $file_name ." is deleted successfully!";
?>