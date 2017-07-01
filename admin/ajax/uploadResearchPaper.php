<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_FILES['file'])){
    //The error validation could be done on the javascript client side.
    $errors= array();        
    $file_name = $_FILES['file']['name'];

    $file_tmp =$_FILES['file']['tmp_name']; 

    $target_dir = dirname(__FILE__)."/uploaded_papers/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
         
    if(empty($errors)==true){
        move_uploaded_file($file_tmp, $target_file);
        echo $file_name ." is upload successfully!";
    }else{
        print_r($errors);
    }
}
?>