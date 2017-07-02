<?php 
require_once '../includes/dbConfig.php'; // The mysql database connection script

if(isset($_FILES['file'])){
    //The error validation could be done on the javascript client side.
    $meta = $_POST;
    
    $new_file_name = $meta['fileName'];

    $errors= array();        

    $file_tmp =$_FILES['file']['tmp_name']; 

    $target_dir = dirname(__FILE__)."/component_images/";
    $target_file = $target_dir . $new_file_name;
         
    if(empty($errors)==true){
        move_uploaded_file($file_tmp, $target_file);
        echo $new_file_name ." is upload successfully!";
    }else{
        print_r($errors);
    }
}
?>